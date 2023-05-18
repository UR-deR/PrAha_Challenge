import { AssignmentStatus } from '../assignment-status/model';

export class Assignment {
  public id: string;
  private readonly title: string;
  private readonly description: string;
  private readonly status: AssignmentStatus;

  private constructor(
    id: string,
    title: string,
    description: string,
    status: AssignmentStatus,
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
  }

  private copy({ status = this.status }) {
    return new Assignment(this.id, this.title, this.description, status);
  }

  public markAsPendingReview(): Assignment {
    return this.copy({ status: AssignmentStatus.PENDING_REVIEW });
  }

  public markAsDone(): Assignment {
    return this.copy({ status: AssignmentStatus.DONE });
  }
}
