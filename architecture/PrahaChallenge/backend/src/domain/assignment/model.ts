import { AssignmentStatus } from '../assignment-status/model';
import { AssignmentId } from '../assignmentId/model';

export class Assignment {
  private readonly id: AssignmentId;
  private status: AssignmentStatus;
  private constructor(
    private readonly title: string,
    private readonly description: string,
  ) {
    this.id = new AssignmentId();
    this.title = title;
    this.description = description;
    this.status = AssignmentStatus.UNTOUCHED;
  }

  static create(title: string, description: string): Assignment {
    return new Assignment(title, description);
  }

  public markAsPendingReview() {
    this.status = AssignmentStatus.PENDING_REVIEW;
  }

  public markAsDone() {
    this.status = AssignmentStatus.DONE;
  }
}
