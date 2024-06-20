import { PairId, ParticipantId, TeamId } from '../id/id';
import { TeamName } from './team-name';

type ConstructorArgs = {
  id: TeamId;
  name: TeamName;
  pairIds: PairId[];
  participantIds: ParticipantId[];
};

export class Team {
  public readonly id: TeamId;
  public readonly name: TeamName;
  public readonly pairIds: PairId[];
  public readonly participantIds: ParticipantId[];
  public readonly canRemoveMember: boolean;
  private static readonly MIN_MEMBER_COUNT = 3;

  private constructor({ id, name, participantIds, pairIds }: ConstructorArgs) {
    const memberCount = participantIds.length;
    if (memberCount < Team.MIN_MEMBER_COUNT) {
      throw new Error(
        `Team must have at least ${Team.MIN_MEMBER_COUNT} members but got ${memberCount}`,
      );
    }
    this.id = id;
    this.name = name;
    this.participantIds = participantIds;
    this.pairIds = pairIds;
    this.canRemoveMember = memberCount > Team.MIN_MEMBER_COUNT;
  }

  public static create(args: Omit<ConstructorArgs, 'id'>): Team {
    return new Team({
      id: TeamId.generate(),
      ...args,
    });
  }

  public static reconstruct(args: ConstructorArgs): Team {
    return new Team({
      ...args,
    });
  }

  private changeMembers({
    participantIds,
  }: Pick<ConstructorArgs, 'participantIds'>): Team {
    return new Team({
      id: this.id,
      name: this.name,
      pairIds: this.pairIds,
      participantIds,
    });
  }

  public removeMembers(removedParticipantIds: ParticipantId[]): Team {
    const newParticipantIds = this.participantIds.filter(
      (id) =>
        !removedParticipantIds
          .map((removedParticipantId) => removedParticipantId.toString())
          .includes(id.toString()),
    );
    return this.changeMembers({ participantIds: newParticipantIds });
  }

  public acceptNewMembers(newParticipantIds: ParticipantId[]): Team {
    return this.changeMembers({
      participantIds: [...this.participantIds, ...newParticipantIds],
    });
  }

  private changePairs({ pairIds }: Pick<ConstructorArgs, 'pairIds'>): Team {
    return new Team({
      id: this.id,
      name: this.name,
      pairIds,
      participantIds: this.participantIds,
    });
  }

  public removePairs(removedPairIds: PairId[]): Team {
    const newPairIds = this.pairIds.filter(
      (id) =>
        !removedPairIds
          .map((removedPairId) => removedPairId.toString())
          .includes(id.toString()),
    );
    return this.changePairs({ pairIds: newPairIds });
  }

  public acceptNewPairs(newPairIds: PairId[]): Team {
    return this.changePairs({ pairIds: [...this.pairIds, ...newPairIds] });
  }
}
