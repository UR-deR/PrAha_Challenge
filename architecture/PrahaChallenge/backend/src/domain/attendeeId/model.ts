import { ulid } from 'ulid';

export class AttendeeId {
  private readonly _value: string;
  public constructor() {
    this._value = ulid();
  }

  get value(): string {
    return this._value;
  }
}
