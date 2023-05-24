import { AddNewAttendeeCommand } from '../../../app/add-new-attendee/usecase';
import { Email } from '../../../domain/email/model';
import { AddNewAttendeeRequest } from '../attendee.controller';

export const AddNewAttendeeAdaptor = {
  toCommand(request: AddNewAttendeeRequest): AddNewAttendeeCommand {
    let email: Email;
    try {
      email = new Email(request.email);
    } catch (_) {
      throw new Error('Invalid email format');
    }

    return {
      name: request.name,
      email: email,
    };
  },
};
