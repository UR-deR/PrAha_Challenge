import { ulid } from 'ulid';

abstract class Id<T extends Id<T>> {
  public constructor(private readonly value: string) {}

  public static generate<T extends Id<T>>(): T {
    return new (this as unknown as new (value: string) => T)(ulid());
  }

  public toString(): string {
    return this.value;
  }

  equals(other: Id<T>): boolean {
    return this.value === other.value;
  }
}

class TeamId extends Id<TeamId> {
  private _: this;
}
class PairId extends Id<PairId> {
  private _: this;
}
class ParticipantId extends Id<ParticipantId> {
  private _: this;
}
class TaskId extends Id<TaskId> {
  private _: this;
}

export { TeamId, PairId, TaskId, ParticipantId };
