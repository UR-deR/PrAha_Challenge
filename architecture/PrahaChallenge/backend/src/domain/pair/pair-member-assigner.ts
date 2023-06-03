import { Inject } from '@nestjs/common';
import { PROVIDERS } from '../../constants';
import { ITeamRepository } from '../../domain/team/repository';
import { Team } from '../../domain/team/model';
import { IPairRepository } from '../../domain/pair/repository';
import { Pair } from './model';
import { Attendee } from '../attendee/model';

export class PairMemberAssigner {
  constructor(
    @Inject(PROVIDERS.TEAM_REPOSITORY)
    private readonly teamRepository: ITeamRepository,
    @Inject(PROVIDERS.PAIR_REPOSITORY)
    private readonly pairRepository: IPairRepository,
  ) {}

  public async assign({ id: attendeeId }: Attendee) {
    const teamWithLeastAttendees = await this.getTeamWithLeastAttendees();
    const pairWithLeastAttendees = await this.getPairWithLeastAttendees(
      teamWithLeastAttendees,
    );
    await this.pairRepository.acceptNewAttendee(
      pairWithLeastAttendees,
      attendeeId,
    );
  }

  private async calculateAttendeeCount(team: Team): Promise<number> {
    const pairs = await this.pairRepository.findByIds(team.pairIds);
    return pairs
      .map((pair) => pair.pairMemberAttendeeIds.length)
      .reduce((a, b) => a + b, 0);
  }

  private async getTeamWithLeastAttendees(): Promise<Team> {
    const allTeams = await this.teamRepository.findAll();
    const teamWithLeastAttendees = allTeams.reduce((a, b) =>
      this.calculateAttendeeCount(a) < this.calculateAttendeeCount(b) ? a : b,
    );
    return teamWithLeastAttendees;
  }

  private async getPairWithLeastAttendees(team: Team): Promise<Pair> {
    const pairs = await this.pairRepository.findByIds(team.pairIds);
    const pairWithLeastAttendees = pairs.reduce((a, b) =>
      a.pairMemberAttendeeIds.length < b.pairMemberAttendeeIds.length ? a : b,
    );
    return pairWithLeastAttendees;
  }
}
