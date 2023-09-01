import { AssignmentId } from '../id/model';

type ConstructorArgs = {
  id: AssignmentId;
  title: string;
  description: string;
};
export class Assignment {
  public readonly id: AssignmentId;
  public readonly title: string;
  public readonly description: string;

  private constructor({ id, title, description }: ConstructorArgs) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  public static reconstruct(args: ConstructorArgs) {
    return new Assignment({
      ...args,
    });
  }
}
