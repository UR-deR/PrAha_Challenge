import { TeamName } from '../team-name/model';
import { TeamId, PairId } from '../id/model';

type ConstructorArgs = {
  id: TeamId;
  name: TeamName;
  pairIds: PairId[];
};

export class Team {
  public readonly id: TeamId;
  public readonly name: TeamName;
  public readonly pairIds: PairId[];

  private constructor({ id, name, pairIds }: ConstructorArgs) {
    this.id = id;
    this.name = name;
    this.pairIds = pairIds;
  }

  public static create(args: Omit<ConstructorArgs, 'id'>): Team {
    return new Team({
      id: TeamId.generate(),
      ...args,
    });
  }

  public static reconstruct(args: Required<ConstructorArgs>): Team {
    return new Team({
      ...args,
    });
  }

  private changePairs({ pairIds }: Pick<ConstructorArgs, 'pairIds'>): Team {
    return new Team({
      id: this.id,
      name: this.name,
      pairIds,
    });
  }

  public removePair(pairId: PairId): Team {
    const pairIds = this.pairIds.filter(
      (pairMemberAttendeeId) => pairMemberAttendeeId.value !== pairId.value,
    );
    return this.changePairs({ pairIds });
  }

  public addNewPair(pairId: PairId): Team {
    const pairIds = [...this.pairIds, pairId];
    return this.changePairs({ pairIds });
  }
}
