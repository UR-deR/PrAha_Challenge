import { Email } from '../email/model';
import { AttendeeStatus } from './../attendee-status/model';

export class Attendee {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: Email,
    public readonly status: AttendeeStatus,
  ) {}
}
