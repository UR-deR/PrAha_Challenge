import { AttendeeId } from '../id/model';
import { Email } from '../email/model';
import { AttendeeStatus } from './../attendee-status/model';

type ConstructorArgs = {
  id: AttendeeId;
  name: string;
  email: Email;
  status: AttendeeStatus;
};

export class Attendee {
  public readonly id: AttendeeId;
  public readonly name: string;
  public readonly email: Email;
  public readonly status: AttendeeStatus;

  private constructor({ id, status, name, email }: ConstructorArgs) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
  }

  public static create(args: Omit<ConstructorArgs, 'id' | 'status'>): Attendee {
    return new Attendee({
      id: AttendeeId.generate(),
      status: AttendeeStatus.ACTIVE,
      ...args,
    });
  }

  public static reconstruct(args: ConstructorArgs): Attendee {
    return new Attendee({
      ...args,
    });
  }

  public updateStatus(status: AttendeeStatus): Attendee {
    return new Attendee({
      id: this.id,
      name: this.name,
      email: this.email,
      status,
    });
  }
}
