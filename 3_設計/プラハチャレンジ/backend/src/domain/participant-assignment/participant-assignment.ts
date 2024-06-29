import { PairId, ParticipantId, TeamId } from '../id/id';

export class ParticipantAssignment {
  constructor(
    public readonly teamId: TeamId,
    public readonly pairId: PairId,
    public readonly participantId: ParticipantId,
  ) {}

  public static create = (
    teamId: TeamId,
    pairId: PairId,
    participantId: ParticipantId,
  ): ParticipantAssignment => {
    return new ParticipantAssignment(teamId, pairId, participantId);
  };

  public changePair = (newPairId: PairId) => {
    return new ParticipantAssignment(
      this.teamId,
      newPairId,
      this.participantId,
    );
  };

  public static reconstruct(
    teamId: TeamId,
    pairId: PairId,
    participantId: ParticipantId,
  ): ParticipantAssignment {
    return new ParticipantAssignment(teamId, pairId, participantId);
  }
}
