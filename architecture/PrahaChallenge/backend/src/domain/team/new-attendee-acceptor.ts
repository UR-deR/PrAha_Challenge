import { Inject, Injectable } from '@nestjs/common';
import { Attendee } from '../attendee/model';
import { ITeamRepository } from './repository';
import { IPairRepository } from '../pair/repository';
import { Team } from './model';
import { PROVIDERS } from '../../constants';
import { FewestMemberPairGetter } from './fewest-member-pair-getter';

@Injectable()
export class NewAttendeeAcceptor {
  public constructor(
    @Inject(PROVIDERS.TEAM_REPOSITORY)
    private teamRepository: ITeamRepository,
    @Inject(PROVIDERS.PAIR_REPOSITORY)
    private pairRepository: IPairRepository,
    private fewestMemberPairGetter: FewestMemberPairGetter,
  ) {}
  public async accept(newAttendee: Attendee) {
    const fewestMemberTeam = await this.getFewestMemberTeam();
    const fewestMemberPair = await this.fewestMemberPairGetter.get(
      fewestMemberTeam,
    );
    const pairWithNewMember = fewestMemberPair.acceptAttendee(newAttendee.id);
    await this.pairRepository.update(pairWithNewMember);
  }

  private async getFewestMemberTeam(): Promise<Team> {
    const allTeams = await this.teamRepository.findAll();

    //rewrite with Promise.all
    const teamWithMemberCount = await Promise.all(
      allTeams.map(async (team) => {
        const pairs = await this.pairRepository.findByIds(team.pairIds);
        const teamMemberCount = pairs
          .map((pair) => pair.pairMemberAttendeeIds)
          .flat().length;
        return {
          team,
          teamMemberCount,
        };
      }),
    );

    const { team: fewestMemberTeam } = teamWithMemberCount.reduce(
      (prev, current) => {
        if (prev.teamMemberCount < current.teamMemberCount) {
          return prev;
        }
        return current;
      },
    );
    return fewestMemberTeam;
  }
}
