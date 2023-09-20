import { ValueOf } from '../../util/type/value-of';

const VALUES = {
  NEW: 'NEW',
  PENDING_REVIEW: 'PENDING_REVIEW',
  COMPLETED: 'COMPLETED',
} as const;

export class TaskStatus {
  private constructor(private readonly value: ValueOf<typeof VALUES>) {}

  public static NEW = new TaskStatus(VALUES.NEW);
  public static PENDING_REVIEW = new TaskStatus(VALUES.PENDING_REVIEW);
  public static COMPLETED = new TaskStatus(VALUES.COMPLETED);

  public static valueOf(value: string): TaskStatus {
    const status = Object.values(VALUES).find((status) => status === value);

    if (!status) {
      throw new Error(`Invalid status value: ${value}`);
    }

    return new TaskStatus(status);
  }

  public equals(other: TaskStatus): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
