import { ulid } from 'ulid';

export class TeamId {
  public constructor(private readonly _value: string) {}

  public static generate(): TeamId {
    return new TeamId(ulid());
  }

  get value(): string {
    return this._value;
  }
}
