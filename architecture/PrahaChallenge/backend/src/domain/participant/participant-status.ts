export class ParticipantStatus {
  private constructor(private readonly value: string) {}

  public static ACTIVE = new ParticipantStatus('ACTIVE');
  public static STAY_AWAY = new ParticipantStatus('STAY_AWAY');
  public static RESIGNED = new ParticipantStatus('RESIGNED');

  public static valueOf(value: string): ParticipantStatus {
    const status = [
      ParticipantStatus.ACTIVE,
      ParticipantStatus.STAY_AWAY,
      ParticipantStatus.RESIGNED,
    ].find((status) => status.value === value);
    if (!status) {
      throw new Error(`Invalid ParticipantStatus value: ${value}`);
    }
    return status;
  }

  public toString(): string {
    return this.value;
  }

  public equals(other: ParticipantStatus): boolean {
    return this.value === other.value;
  }
}
