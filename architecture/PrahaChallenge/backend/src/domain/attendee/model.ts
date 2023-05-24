import { AttendeeId } from '../attendee-id/model';
import { Email } from '../email/model';
import { AttendeeStatus } from './../attendee-status/model';

type ConstructorArgs = {
  id?: AttendeeId;
  name: string;
  email: Email;
  status?: AttendeeStatus;
};

export class Attendee {
  public readonly id: AttendeeId;
  public readonly name: string;
  public readonly email: Email;
  public readonly status: AttendeeStatus;

  private constructor({ id, status, name, email }: ConstructorArgs) {
    this.id = id ?? AttendeeId.generate();
    this.name = name;
    this.email = email;
    this.status = status ?? AttendeeStatus.ACTIVE;
  }

  public static create(
    args: Pick<ConstructorArgs, 'name' | 'email'>,
  ): Attendee {
    return new Attendee({
      ...args,
    });
  }

  public static reconstruct(args: Required<ConstructorArgs>): Attendee {
    return new Attendee({
      ...args,
    });
  }

  private changeStatus(status: AttendeeStatus): Attendee {
    return new Attendee({
      id: this.id,
      name: this.name,
      email: this.email,
      status,
    });
  }

  public resign(): Attendee {
    return this.changeStatus(AttendeeStatus.RESIGNED);
  }

  public stayAway(): Attendee {
    return this.changeStatus(AttendeeStatus.STAY_AWAY);
  }
}
