import { ValueOf } from '../../util/type/value-of';

const VALUES = {
  ACTIVE: 'ACTIVE',
  STAY_AWAY: 'STAY_AWAY',
  RESIGNED: 'RESIGNED',
} as const;

export class ParticipantStatus {
  private constructor(private readonly value: ValueOf<typeof VALUES>) {}

  public static ACTIVE = new ParticipantStatus(VALUES.ACTIVE);
  public static STAY_AWAY = new ParticipantStatus(VALUES.STAY_AWAY);
  public static RESIGNED = new ParticipantStatus(VALUES.RESIGNED);

  public static valueOf(value: string): ParticipantStatus {
    const status = Object.values(VALUES).find((status) => status === value);

    if (!status) {
      throw new Error(`Invalid status value: ${value}`);
    }

    return new ParticipantStatus(status);
  }

  public equals(other: ParticipantStatus): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
