import { Attendee } from '../attendee/model';
import { PairId } from '../pair-id/model';
import { PairName } from '../pair-name/model';

type ConstructorArgs = {
  id: PairId;
  name: PairName;
  attendees: Attendee[];
};

export class Pair {
  public readonly id: PairId;
  private readonly name: PairName;
  private readonly attendees: Attendee[];

  private static readonly MAX_ATTENDEE_COUNT = 3;
  private static readonly MIN_ATTENDEE_COUNT = 2;

  private constructor({ id, name, attendees }: ConstructorArgs) {
    if (
      attendees.length < Pair.MIN_ATTENDEE_COUNT ||
      attendees.length > Pair.MAX_ATTENDEE_COUNT
    ) {
      throw new Error(`Invalid attendee count. given: ${attendees.length}`);
    }
    this.id = id;
    this.name = name;
    this.attendees = attendees;
  }

  public static create(args: Omit<ConstructorArgs, 'id'>): Pair {
    return new Pair({
      id: PairId.generate(),
      ...args,
    });
  }

  public static reconstruct(args: Required<ConstructorArgs>): Pair {
    return new Pair({
      ...args,
    });
  }

  private changeAttendees(attendees: Attendee[]): Pair {
    return new Pair({
      id: this.id,
      name: this.name,
      attendees,
    });
  }

  public removeAttendee(attendee: Attendee): Pair {
    const attendees = this.attendees.filter(({ id }) => id !== attendee.id);
    return this.changeAttendees(attendees);
  }

  public addAttendee(attendee: Attendee): Pair {
    const attendees = [...this.attendees, attendee];
    return this.changeAttendees(attendees);
  }
}
