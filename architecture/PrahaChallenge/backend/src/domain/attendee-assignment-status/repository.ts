import { AssignmentId, AttendeeId } from '../id/model';
import { AttendeeAssignmentStatus } from './model';

export interface IAttendeeAssignmentStatusRepository {
  findByIds(ids: {
    assignmentId: AssignmentId;
    attendeeId: AttendeeId;
  }): Promise<AttendeeAssignmentStatus | undefined>;
  update(assignmentStatusByAttendee: AttendeeAssignmentStatus): Promise<void>;
}
