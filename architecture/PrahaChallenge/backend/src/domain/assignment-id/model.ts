import { ulid } from 'ulid';

export class AssignmentId {
  public constructor(private readonly _value: string) {}

  public static generate(): AssignmentId {
    return new AssignmentId(ulid());
  }

  get value(): string {
    return this._value;
  }
}
