import { AssignmentStatus } from '../assignment-status/model';

export class Assignment {
  private status: AssignmentStatus;
  public constructor(
    public readonly id: string,
    private readonly title: string,
    private readonly description: string,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = AssignmentStatus.UNTOUCHED;
  }

  public markAsPendingReview(): Assignment {
    this.status = AssignmentStatus.PENDING_REVIEW;
    return this;
  }

  public markAsDone(): Assignment {
    this.status = AssignmentStatus.DONE;
    return this;
  }
}
