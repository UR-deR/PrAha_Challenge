import { AssignmentStatus } from '../assignment-status/model';

export class Assignment {
  private constructor(
    public id: string,
    private title: string,
    private description: string,
    private status: AssignmentStatus,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
  }

  private changeStatus(status: AssignmentStatus): Assignment {
    return new Assignment(this.id, this.title, this.description, status);
  }

  public markAsPendingReview(): Assignment {
    return this.changeStatus(AssignmentStatus.PENDING_REVIEW);
  }

  public markAsDone(): Assignment {
    return this.changeStatus(AssignmentStatus.DONE);
  }
}
