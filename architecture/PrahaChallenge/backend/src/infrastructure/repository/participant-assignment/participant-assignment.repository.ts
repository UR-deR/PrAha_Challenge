import { PrismaClient } from '@prisma/client';
import { Pair } from '../../../domain/pair/pair';
import { Injectable } from '@nestjs/common';
import { PairId, ParticipantId, TeamId } from '../../../domain/id/id';
import { IParticipantAssignmentRepository } from '../../../domain/participant-assignment/participant-assignment-repository';
import { ParticipantAssignment } from '../../../domain/participant-assignment/participant-assignment';

@Injectable()
export class ParticipantAssignmentRepository
  implements IParticipantAssignmentRepository
{
  private prismaClient: PrismaClient;
  public constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async register(
    participantAssignment: ParticipantAssignment,
  ): Promise<void> {
    await this.prismaClient.participantAssignment.create({
      data: {
        participantId: participantAssignment.participantId.value,
        pairId: participantAssignment.pairId.value,
        teamId: participantAssignment.teamId.value,
      },
    });
  }
  public async findAllByTeamId(
    teamId: TeamId,
  ): Promise<ParticipantAssignment[]> {
    const participantAssignments =
      await this.prismaClient.participantAssignment.findMany({
        where: {
          teamId: teamId.value,
        },
      });

    return participantAssignments.map(({ participantId, pairId, teamId }) =>
      ParticipantAssignment.reconstruct(
        new TeamId(teamId),
        new PairId(pairId),
        new ParticipantId(participantId),
      ),
    );
  }

  public async update(
    participantAssignment: ParticipantAssignment,
  ): Promise<void> {
    await this.prismaClient.participantAssignment.update({
      where: {
        participantId: participantAssignment.participantId.value,
      },
      data: {
        participantId: participantAssignment.participantId.value,
        pairId: participantAssignment.pairId.value,
        teamId: participantAssignment.teamId.value,
      },
    });
  }

  public async findByParticipantId(
    participantId: ParticipantId,
  ): Promise<ParticipantAssignment> {
    const participantAssignment =
      await this.prismaClient.participantAssignment.findFirstOrThrow({
        where: {
          participantId: participantId.value,
        },
      });

    return ParticipantAssignment.reconstruct(
      new TeamId(participantAssignment.teamId),
      new PairId(participantAssignment.pairId),
      new ParticipantId(participantAssignment.participantId),
    );
  }
}
