import { Email } from '../email/model';
import { AttendeeStatus } from './../attendee-status/model';

export class Attendee {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: Email,
    public readonly status: AttendeeStatus,
  ) {}

  public static reconstruct(
    id: string,
    name: string,
    email: Email,
    status: AttendeeStatus,
  ): Attendee {
    return new Attendee(id, name, email, status);
  }

  private changeStatus(status: AttendeeStatus): Attendee {
    return new Attendee(this.id, this.name, this.email, status);
  }

  public resign(): Attendee {
    return this.changeStatus(AttendeeStatus.RESIGNED);
  }

  public stayAway(): Attendee {
    return this.changeStatus(AttendeeStatus.STAY_AWAY);
  }
}
