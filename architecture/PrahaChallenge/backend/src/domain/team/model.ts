import { Pair } from '../pair/model';
import { TeamName } from '../team-name/model';

export class Team {
  public readonly id: string;
  private readonly name: TeamName;
  private readonly pairs: Pair[];

  private constructor(id: string, name: TeamName, pairs: Pair[]) {
    const attendees = pairs.flatMap(({ attendees }) => attendees);
    if (attendees.length < 3) {
      throw new Error(`Invalid attendee count. given: ${attendees.length}`);
    }
    this.id = id;
    this.name = name;
    this.pairs = pairs;
  }

  private copy({ name: name = this.name, pairs: pairs = this.pairs }): Team {
    return new Team(this.id, name, pairs);
  }

  public reconstruct({
    name: name = this.name,
    pairs: pairs = this.pairs,
  }): Team {
    return new Team(this.id, name, pairs);
  }

  public removePair(pair: Pair): Team {
    const pairs = this.pairs.filter(({ id }) => id !== pair.id);
    return this.copy({ pairs });
  }

  public addNewPair(newPair: Pair): Team {
    const pairs = [...this.pairs, newPair];
    return this.copy({ pairs });
  }
}
