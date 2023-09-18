import { PrismaClient } from '@prisma/client';
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

  public async upsert({
    participantId,
    pairId,
    teamId,
  }: ParticipantAssignment): Promise<void> {
    const newRecord = {
      participantId: participantId.toString(),
      pairId: pairId.toString(),
      teamId: teamId.toString(),
      assignedAt: new Date(),
    };
    await this.prismaClient.participantAssignment.upsert({
      where: {
        participantId: participantId.toString(),
      },
      update: newRecord,
      create: newRecord,
    });
  }

  public async findAllByTeamId(
    teamId: TeamId,
  ): Promise<ParticipantAssignment[]> {
    const participantAssignments =
      await this.prismaClient.participantAssignment.findMany({
        where: {
          teamId: teamId.toString(),
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

  public async findByParticipantId(
    participantId: ParticipantId,
  ): Promise<ParticipantAssignment> {
    const participantAssignment =
      await this.prismaClient.participantAssignment.findFirstOrThrow({
        where: {
          participantId: participantId.toString(),
        },
      });

    return ParticipantAssignment.reconstruct(
      new TeamId(participantAssignment.teamId),
      new PairId(participantAssignment.pairId),
      new ParticipantId(participantAssignment.participantId),
    );
  }

  public async delete({ participantId }: ParticipantAssignment): Promise<void> {
    await this.prismaClient.participantAssignment.delete({
      where: {
        participantId: participantId.toString(),
      },
    });
  }
}
