import { PrismaClient } from '@prisma/client';
import { ISearchSpecificTaskStatusParticipants } from '../../app/query-services/search-specific-task-status-participants';
import { SearchSpecificTaskStatusParticipantsParams } from '../../app/usecases/search-specific-task-status-participants.usecase';
import { ParticipantId, TaskId } from '../../domain/id/id';
import { TaskStatus } from '../../domain/task-status/task-status';

export class SearchSpecificTaskStatusParticipants
  implements ISearchSpecificTaskStatusParticipants
{
  private prismaClient: PrismaClient;
  public constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async execute(params: SearchSpecificTaskStatusParticipantsParams) {
    const participantTaskStatus =
      await this.prismaClient.participantTaskStatus.findMany({
        where: {
          AND: params.condition.map(({ taskId, taskStatus }) => {
            return {
              taskId: taskId.toString(),
              statusId: taskStatus.toString(),
            };
          }),
        },
      });

    const participants = await this.prismaClient.participant.findMany({
      where: {
        id: {
          in: participantTaskStatus.map((participantTaskStatus) => {
            return participantTaskStatus.participantId;
          }),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const tasks = await this.prismaClient.task.findMany({
      where: {
        id: {
          in: participantTaskStatus.map((participantTaskStatus) => {
            return participantTaskStatus.taskId;
          }),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    const taskStatus = await this.prismaClient.taskStatus.findMany({
      where: {
        id: {
          in: participantTaskStatus.map((participantTaskStatus) => {
            return participantTaskStatus.statusId;
          }),
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return {
      value: participantTaskStatus.map((participantTaskStatus) => {
        return {
          taskId: new TaskId(participantTaskStatus.taskId),
          taskName:
            tasks.find((task) => {
              return task.id === participantTaskStatus.taskId;
            })?.name ??
            (() => {
              throw new Error(
                `Task not found. id: ${participantTaskStatus.taskId}`,
              );
            })(),
          taskStatus: TaskStatus.valueOf(
            taskStatus.find((taskStatus) => {
              return taskStatus.id === participantTaskStatus.statusId;
            })?.name ??
              (() => {
                throw new Error(
                  `TaskStatus not found. id: ${participantTaskStatus.statusId}`,
                );
              })(),
          ),
          participants: participants.map((participant) => {
            return {
              id: new ParticipantId(participant.id),
              name: participant.name,
            };
          }),
        };
      }),
    };
  }
}
