import { PrismaClient } from '@prisma/client';
import { ITeamRepository } from '../../../domain/team/team-repository';
import { Team } from '../../../domain/team/team';
import { Injectable } from '@nestjs/common';
import { TeamId, ParticipantId, PairId } from '../../../domain/id/id';
import { TeamName } from '../../../domain/team/team-name';

@Injectable()
export class TeamRepository implements ITeamRepository {
  private prismaClient: PrismaClient;
  public constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async findAll(): Promise<Team[]> {
    const allTeams = await this.prismaClient.team.findMany();
    const allParticipantAssignments =
      await this.prismaClient.participantAssignment.findMany();

    return allTeams.map((team) =>
      Team.reconstruct({
        id: new TeamId(team.id),
        name: new TeamName(team.name),
        pairIds: allParticipantAssignments.flatMap((participantAssignment) =>
          participantAssignment.teamId === team.id
            ? [new PairId(participantAssignment.pairId)]
            : [],
        ),
        participantIds: allParticipantAssignments.flatMap(
          (participantAssignment) =>
            participantAssignment.teamId === team.id
              ? [new ParticipantId(participantAssignment.participantId)]
              : [],
        ),
      }),
    );
  }

  public async save(team: Team): Promise<void> {
    await this.prismaClient.team.upsert({
      where: { id: team.id.value },
      update: {
        name: team.name.value,
      },
      create: {
        id: team.id.value,
        name: team.name.value,
      },
    });
  }
}
