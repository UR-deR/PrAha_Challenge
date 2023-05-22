import { Pair } from '../pair/model';
import { TeamName } from '../team-name/model';
import { TeamId } from '../teamId/model';

export class Team {
  private readonly id: TeamId;
  private readonly name: TeamName;
  private pairs: Pair[];

  private constructor(name: TeamName, pairs: Pair[]) {
    this.id = new TeamId();
    this.name = name;
    this.pairs = pairs;
  }

  public static create(name: TeamName, pairs: Pair[]): Team {
    return new Team(name, pairs);
  }

  public removePair(pair: Pair) {
    const pairs = this.pairs.filter(({ id }) => id !== pair.id);
    this.pairs = pairs;
  }

  public addNewPair(newPair: Pair) {
    const pairs = [...this.pairs, newPair];
    this.pairs = pairs;
  }
}
