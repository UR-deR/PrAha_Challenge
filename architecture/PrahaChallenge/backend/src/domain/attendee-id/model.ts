import { ulid } from 'ulid';

export class AttendeeId {
  public constructor(private readonly _value: string) {}

  public static generate(): AttendeeId {
    return new AttendeeId(ulid());
  }

  get value(): string {
    return this._value;
  }
}
