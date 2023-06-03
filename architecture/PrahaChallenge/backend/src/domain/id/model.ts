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

class TeamId extends Id {
  _teamId!: never;
}
class PairId extends Id {
  _pairId!: never;
}
class AttendeeId extends Id {
  _attendeeId!: never;
}
class AssignmentId extends Id {
  _assignmentId!: never;
}

export { TeamId, PairId, AssignmentId, AttendeeId };
