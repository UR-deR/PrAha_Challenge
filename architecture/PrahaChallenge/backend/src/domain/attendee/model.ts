import { AttendeeId } from '../attendeeId/model';
import { Email } from '../email/model';
import { AttendeeStatus } from './../attendee-status/model';

export class Attendee {
  public readonly id: AttendeeId;
  private status: AttendeeStatus;

  private constructor(
    private readonly name: string,
    private readonly email: Email,
  ) {
    this.id = new AttendeeId();
    this.name = name;
    this.email = email;
    this.status = AttendeeStatus.ACTIVE;
  }

  public resign() {
    this.status = AttendeeStatus.RESIGNED;
  }

  public stayAway() {
    this.status = AttendeeStatus.STAY_AWAY;
  }
}
