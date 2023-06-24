import { TeamId, PairId } from '../../../domain/id/model';
import { TeamName } from '../../../domain/team-name/model';
import { Team } from '../../../domain/team/model';
import { ITeamRepository } from '../../../domain/team/repository';
import prisma from '../../client/prisma-client';

export class TeamRepository implements ITeamRepository {
  public async findById({ value: teamId }: TeamId): Promise<Team | undefined> {
    const team = await prisma.team.findUnique({
      where: {
        id: teamId,
      },
      include: {
        PairTeamBelonging: true,
      },
    });

    if (!team) {
      return undefined;
    }

    return Team.reconstruct({
      id: new TeamId(team.id),
      name: new TeamName(parseInt(team.name, 10)), // I should have set team name as number type
      pairIds: team.PairTeamBelonging.map(({ pairId }) => new PairId(pairId)),
    });
  }

  public async findAll(): Promise<Team[]> {
    const allTeams = await prisma.team.findMany({
      include: {
        PairTeamBelonging: true,
      },
    });

    return allTeams.map(({ id, name, PairTeamBelonging: pairTeamBelonging }) =>
      Team.reconstruct({
        id: new TeamId(id),
        name: new TeamName(parseInt(name, 10)),
        pairIds: pairTeamBelonging.map(({ pairId }) => new PairId(pairId)),
      }),
    );
  }
}
