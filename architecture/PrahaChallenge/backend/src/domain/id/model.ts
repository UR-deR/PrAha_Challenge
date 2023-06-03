import { ulid } from 'ulid';

abstract class Id<T extends Id<T>> {
  public constructor(private readonly _value: string) {}

  public static generate<T extends Id<T>>(): T {
    return new (this as unknown as new (value: string) => T)(ulid());
  }

  get value(): string {
    return this._value;
  }
}

class TeamId extends Id<TeamId> {
  private type: this;
}
class PairId extends Id<PairId> {
  private type: this;
}
class AttendeeId extends Id<AttendeeId> {
  private type: this;
}
class AssignmentId extends Id<AssignmentId> {
  private type: this;
}

export { TeamId, PairId, AssignmentId, AttendeeId };
