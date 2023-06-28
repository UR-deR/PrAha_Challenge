import { AssignmentStatus } from '../assignment-status/model';
import { AssignmentId, AttendeeId } from '../id/model';

type ConstructorArgs = {
  assignmentId: AssignmentId;
  attendeeId: AttendeeId;
  status: AssignmentStatus;
};

export class AttendeeAssignmentStatus {
  public readonly assignmentId: AssignmentId;
  public readonly attendeeId: AttendeeId;
  public readonly status: AssignmentStatus;

  constructor(args: ConstructorArgs) {
    this.assignmentId = args.assignmentId;
    this.attendeeId = args.attendeeId;
    this.status = args.status;
  }

  public static reconstruct(args: ConstructorArgs): AttendeeAssignmentStatus {
    return new AttendeeAssignmentStatus(args);
  }

  public updateStatus(status: AssignmentStatus): AttendeeAssignmentStatus {
    if (this.status === AssignmentStatus.DONE) {
      throw new Error(
        `Cannot change status of done assignment. assignmentId: ${this.assignmentId.value}, attendeeId: ${this.attendeeId.value}`,
      );
    }
    return new AttendeeAssignmentStatus({
      assignmentId: this.assignmentId,
      attendeeId: this.attendeeId,
      status,
    });
  }
}
