import { ulid } from 'ulid';

abstract class Id {
  public constructor(private readonly _value: string) {}

  public static generate(): Id {
    return new (this as any)(ulid());
  }

  get value(): string {
    return this._value;
  }
}

class TeamId extends Id {}
class PairId extends Id {}
class AttendeeId extends Id {}
class AssignmentId extends Id {}

export { TeamId, PairId, AssignmentId, AttendeeId };
