import { PrismaClient } from '@prisma/client';
import { ITeamRepository } from '../../../domain/team/team-repository';
import { Team } from '../../../domain/team/team';
import { Injectable } from '@nestjs/common';
import { TeamId, ParticipantId, PairId } from '../../../domain/id/id';
import { TeamName } from '../../../domain/team/team-name';

@Injectable()
export class TeamRepository implements ITeamRepository {
  private readonly prismaClient: PrismaClient;
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

  public async findById(teamId: TeamId): Promise<Team | undefined> {
    const team = await this.prismaClient.team.findFirst({
      where: {
        id: teamId.toString(),
      },
    });

    if (!team) {
      return undefined;
    }

    const participantAssignments =
      await this.prismaClient.participantAssignment.findMany({
        where: {
          teamId: team.id,
        },
      });

    return Team.reconstruct({
      id: new TeamId(team.id),
      name: new TeamName(team.name),
      pairIds: participantAssignments.map(({ pairId }) => new PairId(pairId)),
      participantIds: participantAssignments.map(
        ({ participantId }) => new ParticipantId(participantId),
      ),
    });
  }

  public async findByPairId(pairId: PairId): Promise<Team | undefined> {
    const participantAssignment =
      await this.prismaClient.participantAssignment.findFirst({
        where: {
          pairId: pairId.toString(),
        },
      });

    if (!participantAssignment) {
      return undefined;
    }

    const team = await this.prismaClient.team.findFirst({
      where: {
        id: participantAssignment.teamId,
      },
    });

    if (!team) {
      return undefined;
    }

    const participantAssignments =
      await this.prismaClient.participantAssignment.findMany({
        where: {
          teamId: team.id,
        },
      });

    return Team.reconstruct({
      id: new TeamId(team.id),
      name: new TeamName(team.name),
      pairIds: participantAssignments.map(({ pairId }) => new PairId(pairId)),
      participantIds: participantAssignments.map(
        ({ participantId }) => new ParticipantId(participantId),
      ),
    });
  }

  public async findFewestMemberTeam(): Promise<Team> {
    const allTeams = await this.prismaClient.team.findMany();
    const allParticipantAssignments =
      await this.prismaClient.participantAssignment.findMany();

    const [fewestMemberTeam] = allTeams
      .map((team) =>
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
      )
      .sort((a, b) => a.participantIds.length - b.participantIds.length);

    return fewestMemberTeam;
  }

  public async save(team: Team): Promise<void> {
    const teamId = team.id.toString();
    await this.prismaClient.team.upsert({
      where: { id: teamId },
      update: {
        name: team.name.value,
      },
      create: {
        id: teamId,
        name: team.name.value,
      },
    });
  }
}
