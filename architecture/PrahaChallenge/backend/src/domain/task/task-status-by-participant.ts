import { ParticipantId, TaskId } from '../id/id';
import { TaskStatus } from './task-status';

type ConstructorArgs = {
  taskId: TaskId;
  participantId: ParticipantId;
  status: TaskStatus;
};

export class participantTaskStatus {
  public readonly taskId: TaskId;
  public readonly participantId: ParticipantId;
  public readonly status: TaskStatus;

  private constructor(args: ConstructorArgs) {
    this.taskId = args.taskId;
    this.participantId = args.participantId;
    this.status = args.status;
  }

  public static reconstruct(args: ConstructorArgs): participantTaskStatus {
    return new participantTaskStatus(args);
  }

  public updateStatus(status: TaskStatus): participantTaskStatus {
    if (this.status === TaskStatus.COMPLETED) {
      throw new Error(
        `Cannot change status of completed Task. TaskId: ${this.taskId.toString()}, participantId: ${this.participantId.toString()}`,
      );
    }
    return new participantTaskStatus({
      taskId: this.taskId,
      participantId: this.participantId,
      status,
    });
  }
}
