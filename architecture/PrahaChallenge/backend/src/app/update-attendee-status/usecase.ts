import { IAttendeeRepository } from '../../domain/attendee/repository';
import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from '../../constants';
import { InactiveAttendeeRemover } from '../../domain/team/attendee-remover';
import { AttendeeId } from '../../domain/id/model';
import { AttendeeStatus } from '../../domain/attendee-status/model';
import { NewAttendeeAcceptor } from '../../domain/team/new-attendee-acceptor';

export interface UpdateAttendeeStatusCommand {
  attendeeId: AttendeeId;
  newStatus: AttendeeStatus;
}

@Injectable()
export class UpdateAttendeeStatusUseCase {
  constructor(
    @Inject(PROVIDERS.ATTENDEE_REPOSITORY)
    private readonly attendeeRepository: IAttendeeRepository,
    private readonly inactiveAttendeeRemover: InactiveAttendeeRemover,
    private readonly newAttendeeAcceptor: NewAttendeeAcceptor,
  ) {}
  public async do(command: UpdateAttendeeStatusCommand) {
    const attendee = await this.attendeeRepository.findById(command.attendeeId);
    if (!attendee) {
      throw new Error(
        `Attendee not found. attendeeId: ${command.attendeeId.value}`,
      );
    }
    const statusUpdatedAttendee = attendee.updateStatus(command.newStatus);
    if (command.newStatus === AttendeeStatus.ACTIVE) {
      await this.newAttendeeAcceptor.accept(statusUpdatedAttendee);
    } else {
      await this.inactiveAttendeeRemover.remove(statusUpdatedAttendee);
    }
    await this.attendeeRepository.update(statusUpdatedAttendee);
  }
}
