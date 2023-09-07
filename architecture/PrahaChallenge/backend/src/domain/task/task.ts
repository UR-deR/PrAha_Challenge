import { TaskId } from '../id/id';

type ConstructorArgs = {
  id: TaskId;
  title: string;
  description: string;
};
export class Task {
  public readonly id: TaskId;
  public readonly title: string;
  public readonly description: string;

  private constructor({ id, title, description }: ConstructorArgs) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  public static reconstruct(args: ConstructorArgs) {
    return new Task({
      ...args,
    });
  }
}
