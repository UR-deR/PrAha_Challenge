import { Pair } from '../pair/model';
import { TeamName } from '../team-name/model';
import { TeamId } from '../team-id/model';

type ConstructorArgs = {
  id: TeamId;
  name: TeamName;
  pairs: Pair[];
};

export class Team {
  private readonly id: TeamId;
  private readonly name: TeamName;
  private readonly pairs: Pair[];

  private constructor({ id, name, pairs }: ConstructorArgs) {
    this.id = id;
    this.name = name;
    this.pairs = pairs;
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

  private changePairs(pairs: Pair[]): Team {
    return new Team({
      id: this.id,
      name: this.name,
      pairs,
    });
  }

  public removePair(pair: Pair): Team {
    const pairs = this.pairs.filter(({ id }) => id !== pair.id);
    return this.changePairs(pairs);
  }

  public addNewPair(newPair: Pair) {
    const pairs = [...this.pairs, newPair];
    return this.changePairs(pairs);
  }
}
