import { Inject, Injectable } from '@nestjs/common';
import { INJECTION_TOKENS } from '../../injection-tokens';
import { ParticipantId, TaskId } from '../../domain/id/id';
import { TaskStatus } from '../../domain/task-status/task-status';
import { IParticipantTaskStatusRepository } from '../../domain/participant-task-status/participant-task-status-repository';

export type UpdateTaskStatusParams = {
  participantId: ParticipantId;
  taskId: TaskId;
  newStatus: TaskStatus;
};

@Injectable()
export class UpdateTaskStatusUsecase {
  constructor(
    @Inject(INJECTION_TOKENS.PARTICIPANT_TASK_STATUS_REPOSITORY)
    private readonly participantTaskStatusRepository: IParticipantTaskStatusRepository,
  ) {}

  public async do({
    participantId,
    taskId,
    newStatus,
  }: UpdateTaskStatusParams): Promise<void> {
    const participantTaskStatus =
      await this.participantTaskStatusRepository.find(participantId, taskId);

    if (!participantTaskStatus) {
      throw new Error(
        `ParticipantTaskStatus not found. participantId: ${participantId.toString()}, taskId: ${taskId.toString()}`,
      );
    }

    const updatedParticipantTaskStatus =
      participantTaskStatus.updateStatus(newStatus);

    await this.participantTaskStatusRepository.update(
      updatedParticipantTaskStatus,
    );
  }
}
