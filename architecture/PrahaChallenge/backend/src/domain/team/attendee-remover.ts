import { Inject, Injectable } from '@nestjs/common';
import { Attendee } from '../attendee/model';
import { ITeamRepository } from './repository';
import { IPairRepository } from '../pair/repository';
import { Team } from './model';
import { Pair } from '../pair/model';
import { PairName } from '../pair-name/model';
import { AttendeeId } from '../id/model';

@Injectable()
export class InactiveAttendeeRemover {
  public constructor(
    @Inject('TeamRepository')
    private teamRepository: ITeamRepository,
    @Inject('PairRepository')
    private pairRepository: IPairRepository,
  ) {}
  public async remove(inactiveAttendee: Attendee) {
    const belongingTeam = await this.getBelongingTeam(inactiveAttendee);
    const teamMemberCount = await this.getTeamMemberCount(belongingTeam);

    if (teamMemberCount === Team.MIN_ATTENDEE_COUNT) {
      // send email to administator
      // because team is in short of member
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

  private async getTeamMemberCount(team: Team): Promise<number> {
    const pairs = await this.pairRepository.findByIds(team.pairIds);
    const teamMemberCount = pairs.reduce((acc, pair) => {
      return acc + pair.pairMemberAttendeeIds.length;
    }, 0);
    return teamMemberCount;
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
      name: new PairName('z'),
      pairMemberAttendeeIds: [randomAttendeeId, attendeeId],
    });
    await this.pairRepository.insert(newPair);
    await this.pairRepository.update(
      fewestMemberPair.removeAttendee(randomAttendeeId),
    );
  }

  //assign
}
