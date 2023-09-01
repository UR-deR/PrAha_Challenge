import { AssignmentId, AttendeeId } from '../../domain/id/model';
import { AssignmentStatus } from '../../domain/assignment-status/model';
import { Inject } from '@nestjs/common';
import { PROVIDERS } from '../../constants';
import { IAttendeeAssignmentStatusRepository } from '../../domain/attendee-assignment-status/repository';

export interface UpdateAssignmentStatusCommand {
  assignmentId: AssignmentId;
  attendeeId: AttendeeId;
  status: AssignmentStatus;
}

export class UpdateAssignmentStatusUsecase {
  constructor(
    @Inject(PROVIDERS.ATTENDEE_ASSIGNMENT_STATUS_REPOSITORY)
    private readonly attendeeAssignmentStatusRepository: IAttendeeAssignmentStatusRepository,
  ) {}
  public async do(command: UpdateAssignmentStatusCommand) {
    const attendeeAssignmentStatus =
      await this.attendeeAssignmentStatusRepository.findByIds({
        assignmentId: command.assignmentId,
        attendeeId: command.attendeeId,
      });

    if (!attendeeAssignmentStatus) {
      throw new Error(
        `Not found attendeeAssignmentStatus. assignmentId: ${command.assignmentId.value}, attendeeId: ${command.attendeeId.value}`,
      );
    }

    const updatedAttendeeAssignmentStatus =
      attendeeAssignmentStatus.updateStatus(command.status);

    this.attendeeAssignmentStatusRepository.update(
      updatedAttendeeAssignmentStatus,
    );
  }
}
