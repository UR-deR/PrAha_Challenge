import { Attendee } from '../attendee/model';
import { PairName } from '../pair-name/model';

export class Pair {
  public readonly id: string;
  private readonly name: PairName;
  public readonly attendees: Attendee[];

  static MAX_ATTENDEE_COUNT = 3;
  static MIN_ATTENDEE_COUNT = 2;

  private constructor(id: string, name: PairName, attendees: Attendee[]) {
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

  private changeAttendees(attendees: Attendee[]): Pair {
    return new Pair(this.id, this.name, attendees);
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
