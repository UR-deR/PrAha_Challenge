import { ParticipantId, TaskId } from '../id/id';
import { TaskStatus } from './task-status';

type ConstructorArgs = {
  TaskId: TaskId;
  participantId: ParticipantId;
  status: TaskStatus;
};

export class participantTaskStatus {
  public readonly TaskId: TaskId;
  public readonly participantId: ParticipantId;
  public readonly status: TaskStatus;

  constructor(args: ConstructorArgs) {
    this.TaskId = args.TaskId;
    this.participantId = args.participantId;
    this.status = args.status;
  }

  public static reconstruct(args: ConstructorArgs): participantTaskStatus {
    return new participantTaskStatus(args);
  }

  public updateStatus(status: TaskStatus): participantTaskStatus {
    if (this.status === TaskStatus.COMPLETED) {
      throw new Error(
        `Cannot change status of completed Task. TaskId: ${this.TaskId.value}, participantId: ${this.participantId.value}`,
      );
    }
    return new participantTaskStatus({
      TaskId: this.TaskId,
      participantId: this.participantId,
      status,
    });
  }
}
