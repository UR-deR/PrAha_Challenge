import { PairId, ParticipantId } from '../id/id';
import { PairName } from './pair-name';

type ConstructorArgs = {
  id: PairId;
  name: PairName;
  pairMemberIds: ParticipantId[];
};

export class Pair {
  public readonly id: PairId;
  public readonly name: PairName;
  public readonly pairMemberIds: ParticipantId[];

  public readonly isVacant: boolean;
  public readonly canRemoveMember: boolean;

  private static readonly MAX_MEMBER_COUNT = 3;
  private static readonly MIN_MEMBER_COUNT = 2;

  private constructor({ id, name, pairMemberIds }: ConstructorArgs) {
    const memberCount = pairMemberIds.length;
    if (
      memberCount < Pair.MIN_MEMBER_COUNT ||
      memberCount > Pair.MAX_MEMBER_COUNT
    ) {
      throw new Error(`Invalid Member count for PairId: ${id.toString()}
      . memberCount: ${memberCount}`);
    }
    this.id = id;
    this.name = name;
    this.pairMemberIds = pairMemberIds;
    this.isVacant = memberCount < Pair.MAX_MEMBER_COUNT;
    this.canRemoveMember = memberCount > Pair.MIN_MEMBER_COUNT;
  }

  public static create(
    pairMemberIds: Pick<ConstructorArgs, 'pairMemberIds'>['pairMemberIds'],
    existingPairs: Pair[],
  ): Pair {
    return new Pair({
      id: PairId.generate(),
      name: PairName.generate(
        existingPairs.map((existingPair) => existingPair.name),
      ),
      pairMemberIds,
    });
  }

  public static reconstruct(args: ConstructorArgs): Pair {
    return new Pair({
      ...args,
    });
  }

  private changeMembers({
    pairMemberIds,
  }: Pick<ConstructorArgs, 'pairMemberIds'>): Pair {
    return new Pair({
      id: this.id,
      name: this.name,
      pairMemberIds,
    });
  }

  public removeMember(participantId: ParticipantId): Pair {
    const pairMemberIds = this.pairMemberIds.filter(
      ({ equals }) => !equals(participantId),
    );
    return this.changeMembers({ pairMemberIds });
  }

  public acceptMember(participantId: ParticipantId): Pair {
    const pairMemberIds = [...this.pairMemberIds, participantId];
    return this.changeMembers({ pairMemberIds });
  }
}
