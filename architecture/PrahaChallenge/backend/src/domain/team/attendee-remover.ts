import { Inject, Injectable } from '@nestjs/common';
import { Attendee } from '../attendee/model';
import { ITeamRepository } from './repository';
import { IPairRepository } from '../pair/repository';
import { Team } from './model';
import { Pair } from '../pair/model';
import { PairName } from '../pair-name/model';
import { AttendeeId } from '../id/model';
import { PROVIDERS } from '../../constants';
import {
  EmailAddressConfig,
  IEmailClient,
  EmailTemplateConfig,
  InShortOfTeamMemberNotificationParameter,
} from '../email/email-client';
import { Admin } from '../admin/model';
import { IAttendeeRepository } from '../attendee/repository';

@Injectable()
export class InactiveAttendeeRemover {
  public constructor(
    @Inject(PROVIDERS.TEAM_REPOSITORY)
    private teamRepository: ITeamRepository,
    @Inject(PROVIDERS.PAIR_REPOSITORY)
    private pairRepository: IPairRepository,
    @Inject(PROVIDERS.ATTENDEE_REPOSITORY)
    private attendeeRepository: IAttendeeRepository,
    @Inject(PROVIDERS.EMAIL_CLIENT)
    private emailClient: IEmailClient,
  ) {}
  public async remove(inactiveAttendee: Attendee) {
    const belongingTeam = await this.getBelongingTeam(inactiveAttendee);
    const otherTeamMembers = await this.getOtherTeamMembers(
      belongingTeam,
      inactiveAttendee,
    );
    const teamMembers = [inactiveAttendee, ...otherTeamMembers];
    if (teamMembers.length === Team.MIN_ATTENDEE_COUNT) {
      await this.sendInShortOfTeamMemberNotificationEmail(
        {
          inactiveAttendee,
          otherTeamMembers,
        },
        belongingTeam,
      );
      return;
    }

    const belongingPair = await this.getBelongingPair(inactiveAttendee);
    if (
      belongingPair.pairMemberAttendeeIds.length !== Pair.MIN_ATTENDEE_COUNT
    ) {
      await this.pairRepository.update(
        belongingPair.removeAttendee(inactiveAttendee.id),
      );
      return;
    }

    const [loneAttendeeId] = belongingPair.pairMemberAttendeeIds.filter(
      (pairMemberAttendeeId) =>
        pairMemberAttendeeId.value !== inactiveAttendee.id.value,
    );
    const fewestMemberPair = await this.getFewestMemberPair(belongingTeam);
    if (
      fewestMemberPair.pairMemberAttendeeIds.length === Pair.MAX_ATTENDEE_COUNT
    ) {
      await this.dividePairIntoTwo(fewestMemberPair, loneAttendeeId);
    } else {
      await this.pairRepository.update(
        fewestMemberPair.addAttendee(loneAttendeeId),
      );
    }
    this.pairRepository.delete(belongingPair);
  }

  private async getBelongingTeam(attendee: Attendee): Promise<Team> {
    const allTeam = await this.teamRepository.findAll();
    const belongingTeam =
      allTeam.find(async (team) => {
        const pairs = await this.pairRepository.findByIds(team.pairIds);
        pairs.find((pair) => {
          if (pair.pairMemberAttendeeIds.includes(attendee.id)) {
            return team;
          }
        });
      }) ??
      (() => {
        throw new Error(
          `attendee is not belonging to any team. attendeeId: ${attendee.id}`,
        );
      })();

    return belongingTeam;
  }

  private async getBelongingPair(attendee: Attendee): Promise<Pair> {
    const allPair = await this.pairRepository.findAll();
    const belongingPair =
      allPair.find(async (pair) => {
        if (pair.pairMemberAttendeeIds.includes(attendee.id)) {
          return pair;
        }
      }) ??
      (() => {
        throw new Error(
          `attendee is not belonging to any pair. attendeeId: ${attendee.id}`,
        );
      })();
    return belongingPair;
  }

  private async getOtherTeamMembers(
    team: Team,
    inactiveattendee: Attendee,
  ): Promise<Attendee[]> {
    const pairs = await this.pairRepository.findByIds(team.pairIds);
    const otherTeamMemberIds = pairs
      .map(({ pairMemberAttendeeIds }) =>
        pairMemberAttendeeIds.filter(
          (pairMemberAttendeeId) =>
            pairMemberAttendeeId.value !== inactiveattendee.id.value,
        ),
      )
      .flat();
    const otherTeamMembers = await this.attendeeRepository.findByIds(
      otherTeamMemberIds,
    );
    return otherTeamMembers;
  }

  private async getFewestMemberPair(team: Team): Promise<Pair> {
    const pairs = await this.pairRepository.findByIds(team.pairIds);
    const fewestMemberPair = pairs.reduce((acc, pair) => {
      return acc.pairMemberAttendeeIds.length <
        pair.pairMemberAttendeeIds.length
        ? acc
        : pair;
    });
    return fewestMemberPair;
  }

  private async dividePairIntoTwo(
    fewestMemberPair: Pair,
    attendeeId: AttendeeId,
  ): Promise<void> {
    const [randomAttendeeId] = fewestMemberPair.pairMemberAttendeeIds;
    const newPair = Pair.create({
      name: new PairName('z'), //TODO: 仮の名前なので後で変更する。処理を考える必要がある
      pairMemberAttendeeIds: [randomAttendeeId, attendeeId],
    });
    await this.pairRepository.insert(newPair);
    await this.pairRepository.update(
      fewestMemberPair.removeAttendee(randomAttendeeId),
    );
  }

  private async sendInShortOfTeamMemberNotificationEmail(
    {
      inactiveAttendee,
      otherTeamMembers,
    }: {
      inactiveAttendee: Attendee;
      otherTeamMembers: Attendee[];
    },
    belongingTeam: Team,
  ): Promise<void> {
    const emailTemplateConfig =
      EmailTemplateConfig.InShortOfTeamMemberNotification(
        new InShortOfTeamMemberNotificationParameter(
          belongingTeam.name,
          inactiveAttendee,
          otherTeamMembers,
        ),
      );
    const emailAddressConfig = new EmailAddressConfig(
      inactiveAttendee.email.value,
      [Admin.EMAIL_ADDRESS],
    );

    await this.emailClient.send(emailTemplateConfig, emailAddressConfig);
  }
}
