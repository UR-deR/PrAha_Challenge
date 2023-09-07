import { ulid } from 'ulid';

abstract class Id<T extends Id<T>> {
  public constructor(public readonly value: string) {}

  public static generate<T extends Id<T>>(): T {
    return new (this as unknown as new (value: string) => T)(ulid());
  }

  equals(other: Id<T>): boolean {
    return this.value === other.value;
  }
}

class TeamId extends Id<TeamId> {
  private type: this;
}
class PairId extends Id<PairId> {
  private type: this;
}
class ParticipantId extends Id<ParticipantId> {
  private type: this;
}
class TaskId extends Id<TaskId> {
  private type: this;
}

export { TeamId, PairId, TaskId, ParticipantId };
