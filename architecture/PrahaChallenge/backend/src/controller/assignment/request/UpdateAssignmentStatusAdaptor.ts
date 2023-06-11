import { UpdateAssignmentStatusCommand } from '../../../app/update-assignment-status/usecase';
import { AssignmentStatus } from '../../../domain/assignment-status/model';
import { AssignmentId, AttendeeId } from '../../../domain/id/model';
import { UpdateAssignmentStatusRequest } from './UpdateAssignmentStatusRequest';

export const UpdateAssignmentStatusAdaptor = {
  toCommand(
    request: UpdateAssignmentStatusRequest,
  ): UpdateAssignmentStatusCommand {
    const status: AssignmentStatus =
      Object.values(AssignmentStatus).find(
        (assignmentStatus) => assignmentStatus === request.status,
      ) ??
      (() => {
        throw new Error(`Invalid assignment status. given: ${request.status}`);
      })();

    return {
      assignmentId: new AssignmentId(request.assignmentId),
      attendeeId: new AttendeeId(request.attendeeId),
      status,
    };
  },
};
