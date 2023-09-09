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

  public removeMember(participantId: ParticipantId): Team {
    const participantIds = this.participantIds.filter(
      ({ equals }) => !equals(participantId),
    );
    return this.changeMembers({ participantIds });
  }

  public acceptNewMember(participantId: ParticipantId): Team {
    const participantIds = [...this.participantIds, participantId];
    return this.changeMembers({ participantIds });
  }
}
