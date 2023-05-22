import { ulid } from 'ulid';

export class AssignmentId {
  private readonly value: string;
  public constructor() {
    this.value = ulid();
  }

  get id(): string {
    return this.value;
  }
}
