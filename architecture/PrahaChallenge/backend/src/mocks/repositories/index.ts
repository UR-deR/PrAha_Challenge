import { AttendeeAssignmentStatusRepository } from '../../infrastructure/repository/assignment-status-by-attendee/repository';

const MockAttendeeAssignmentStatusRepository = jest.fn<
  AttendeeAssignmentStatusRepository,
  []
>(() => ({
  findByIds: jest.fn(),
  update: jest.fn(),
}));

export { MockAttendeeAssignmentStatusRepository };
