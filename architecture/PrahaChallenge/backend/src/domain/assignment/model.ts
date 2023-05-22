import { AssignmentStatus } from '../assignment-status/model';
import { AssignmentId } from '../assignment-id/model';

type ConstructorArgs = {
  id?: AssignmentId;
  status?: AssignmentStatus;
  title: string;
  description: string;
};
export class Assignment {
  private readonly id: AssignmentId;
  private readonly status: AssignmentStatus;
  private readonly title: string;
  private readonly description: string;

  private constructor({ id, title, description, status }: ConstructorArgs) {
    this.id = id ?? AssignmentId.generate();
    this.title = title;
    this.description = description;
    this.status = status ?? AssignmentStatus.UNTOUCHED;
  }

  public static create(
    args: Pick<ConstructorArgs, 'title' | 'description'>,
  ): Assignment {
    return new Assignment({
      ...args,
    });
  }

  public reconstruct(args: Required<ConstructorArgs>) {
    return new Assignment({
      ...args,
    });
  }

  private changeStatus(status: AssignmentStatus): Assignment {
    if (this.status === AssignmentStatus.DONE) {
      throw new Error('Cannot change status of done assignment');
    }
    return new Assignment({
      id: this.id,
      title: this.title,
      description: this.description,
      status,
    });
  }

  public markAsPendingReview(): Assignment {
    return this.changeStatus(AssignmentStatus.PENDING_REVIEW);
  }

  public markAsDone(): Assignment {
    return this.changeStatus(AssignmentStatus.DONE);
  }
}
