import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { IParticipantTaskStatusRepository } from '../../../domain/participant-task-status/participant-task-status-repository';
import { ParticipantId, TaskId } from '../../../domain/id/id';
import { ParticipantTaskStatus } from '../../../domain/participant-task-status/participant-task-status';
import { TaskStatus } from '../../../domain/task-status/task-status';

@Injectable()
export class ParticipantTaskStatusRepository
  implements IParticipantTaskStatusRepository
{
  private prismaClient: PrismaClient;
  public constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async find(
    participantId: ParticipantId,
    taskId: TaskId,
  ): Promise<ParticipantTaskStatus | undefined> {
    const participantTaskStatus =
      await this.prismaClient.participantTaskStatus.findFirst({
        where: {
          participantId: participantId.toString(),
          taskId: taskId.toString(),
        },
      });

    if (!participantTaskStatus) {
      return undefined;
    }

    const taskStatus = await this.prismaClient.taskStatus.findFirstOrThrow({
      where: {
        id: participantTaskStatus.statusId,
      },
    });

    return ParticipantTaskStatus.reconstruct({
      taskId: new TaskId(participantTaskStatus.taskId),
      participantId: new ParticipantId(participantTaskStatus.participantId),
      status: TaskStatus.valueOf(taskStatus.name),
    });
  }

  public async update(
    participantTaskStatus: ParticipantTaskStatus,
  ): Promise<void> {
    const taskStatus = await this.prismaClient.taskStatus.findFirstOrThrow({
      where: {
        name: participantTaskStatus.status.toString(),
      },
    });

    await this.prismaClient.participantTaskStatus.update({
      where: {
        participantId_taskId: {
          participantId: participantTaskStatus.participantId.toString(),
          taskId: participantTaskStatus.taskId.toString(),
        },
      },
      data: {
        statusId: taskStatus.id,
      },
    });
  }
}
