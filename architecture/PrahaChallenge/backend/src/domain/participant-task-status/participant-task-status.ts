import { ParticipantId, TaskId } from '../id/id';
import { TaskStatus } from '../task-status/task-status';

type ConstructorArgs = {
  taskId: TaskId;
  participantId: ParticipantId;
  status: TaskStatus;
};

export class ParticipantTaskStatus {
  public readonly taskId: TaskId;
  public readonly participantId: ParticipantId;
  public readonly status: TaskStatus;

  public constructor(args: ConstructorArgs) {
    this.taskId = args.taskId;
    this.participantId = args.participantId;
    this.status = args.status;
  }

  public static reconstruct(args: ConstructorArgs): ParticipantTaskStatus {
    return new ParticipantTaskStatus(args);
  }

  public updateStatus(status: TaskStatus): ParticipantTaskStatus {
    if (this.status.equals(TaskStatus.COMPLETED)) {
      throw new Error(
        `Cannot update status of completed Task. TaskId: ${this.taskId.toString()}, participantId: ${this.participantId.toString()}`,
      );
    }
    return new ParticipantTaskStatus({
      taskId: this.taskId,
      participantId: this.participantId,
      status,
    });
  }
}
