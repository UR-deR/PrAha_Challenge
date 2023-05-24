import { AttendeeService } from './../../domain/attendee/service';
import { Email } from '../../domain/email/model';
import { IAttendeeRepository } from '../../domain/attendee/repository';
import { Attendee } from '../../domain/attendee/model';

export interface AddNewAttendeeCommand {
  name: string;
  email: Email;
}

export class AddNewAttendeeUsecase {
  constructor(
    private readonly attendeeService: AttendeeService,
    private readonly attendeeRepository: IAttendeeRepository,
  ) {}
  public async do(command: AddNewAttendeeCommand) {
    const isDuplicatedEmail = await this.attendeeService.isDuplicatedEmail(
      command.email,
    );
    if (isDuplicatedEmail) {
      throw new Error(`Duplicated email: ${command.email.value}`);
    }
    const newAttendee = Attendee.create({ ...command });
    await this.attendeeRepository.save(newAttendee);
  }
}
