import { AssignmentStatus } from '../../domain/assignment-status/model';
import { AttendeeAssignmentStatus } from '../../domain/attendee-assignment-status/model';
import { AssignmentId, AttendeeId } from '../../domain/id/model';
import { MockAttendeeAssignmentStatusRepository } from '../../mocks/repositories';
import { UpdateAssignmentStatusUsecase } from './usecase';

const testData = {
  assignmentId: new AssignmentId('assignmentId'),
  attendeeId: new AttendeeId('attendeeId'),
} as const;

describe('UpdateAssignmentStatusUseCase', () => {
  const mockAttendeeAssignmentStatusRepository =
    new MockAttendeeAssignmentStatusRepository();

  test('課題のステータスが更新されて永続化されること', async () => {
    mockAttendeeAssignmentStatusRepository.findByIds = jest
      .fn()
      .mockResolvedValueOnce(
        new AttendeeAssignmentStatus({
          assignmentId: testData.assignmentId,
          attendeeId: testData.attendeeId,
          status: AssignmentStatus.PENDING_REVIEW,
        }),
      );
    const updateAssignmentStatusUsecase = new UpdateAssignmentStatusUsecase(
      mockAttendeeAssignmentStatusRepository,
    );

    await updateAssignmentStatusUsecase.do({
      assignmentId: testData.assignmentId,
      attendeeId: testData.attendeeId,
      status: AssignmentStatus.DONE,
    });

    expect(mockAttendeeAssignmentStatusRepository.update).toBeCalledWith({
      assignmentId: testData.assignmentId,
      attendeeId: testData.attendeeId,
      status: AssignmentStatus.DONE,
    });
  });

  test('assignmentIdとattendeeIdの組み合わせに合致するデータが存在しない場合、エラーが発生する', async () => {
    mockAttendeeAssignmentStatusRepository.findByIds = jest
      .fn()
      .mockResolvedValueOnce(undefined);
    const updateAssignmentStatusUsecase = new UpdateAssignmentStatusUsecase(
      mockAttendeeAssignmentStatusRepository,
    );

    await expect(
      updateAssignmentStatusUsecase.do({
        assignmentId: testData.assignmentId,
        attendeeId: testData.attendeeId,
        status: AssignmentStatus.DONE,
      }),
    ).rejects.toThrowError(
      `Not found attendeeAssignmentStatus. assignmentId: assignmentId, attendeeId: attendeeId`,
    );
  });
});
