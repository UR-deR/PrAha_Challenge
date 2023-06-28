import { AssignmentStatus } from '../assignment-status/model';
import { AssignmentId, AttendeeId } from '../id/model';
import { AttendeeAssignmentStatus } from './model';

const testData = {
  assignmentId: new AssignmentId('assignmentId'),
  attendeeId: new AttendeeId('attendeeId'),
} as const;

describe('AttendeeAssignmentStatusModel', () => {
  test('完了済みの課題を更新しようとするとエラーが発生する', () => {
    const doneAssignment = new AttendeeAssignmentStatus({
      ...testData,
      status: AssignmentStatus.DONE,
    });

    expect(() => {
      doneAssignment.updateStatus(AssignmentStatus.PENDING_REVIEW);
    }).toThrowError(
      `Cannot change status of done assignment. assignmentId: ${testData.assignmentId.value}, attendeeId: ${testData.attendeeId.value}`,
    );
  });

  test('完了済み以外のステータスの課題を更新することができる', () => {
    const pendingReviewAssignment = new AttendeeAssignmentStatus({
      ...testData,
      status: AssignmentStatus.PENDING_REVIEW,
    });

    const updatedAssignment = pendingReviewAssignment.updateStatus(
      AssignmentStatus.DONE,
    );

    expect(updatedAssignment).toStrictEqual(
      new AttendeeAssignmentStatus({
        ...testData,
        status: AssignmentStatus.DONE,
      }),
    );
  });
});
