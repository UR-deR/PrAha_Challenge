import { Email } from '../email/email';
import { ParticipantId } from '../id/id';
import { ParticipantStatus } from './participant-status';

type ConstructorArgs = {
  id: ParticipantId;
  name: string;
  email: Email;
  status: ParticipantStatus;
};

export class Participant {
  public readonly id: ParticipantId;
  public readonly name: string;
  public readonly email: Email;
  public readonly status: ParticipantStatus;
  public readonly isActive: boolean;

  private constructor({ id, status, name, email }: ConstructorArgs) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.status = status;
    this.isActive = status.equals(ParticipantStatus.ACTIVE);
  }

  public static create(
    args: Omit<ConstructorArgs, 'id' | 'status'>,
  ): Participant {
    return new Participant({
      id: ParticipantId.generate(),
      status: ParticipantStatus.ACTIVE,
      ...args,
    });
  }

  public static reconstruct(args: ConstructorArgs): Participant {
    return new Participant({
      ...args,
    });
  }

  public updateStatus(status: ParticipantStatus): Participant {
    return new Participant({
      id: this.id,
      name: this.name,
      email: this.email,
      status,
    });
  }
}
