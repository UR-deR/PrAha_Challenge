import { AssignmentStatus } from '../assignment-status/model';
import { Assignment } from './model';

describe('Assignment', () => {
  test('markAsPendingReviewメソッドによってstatusがPENDING_REVIEW', () => {
    const assignment = Assignment.create({
      title: 'title',
      description: 'description',
    });
    const pendingReviewAssignment = assignment.markAsPendingReview();
    expect((pendingReviewAssignment as any).status).toBe(
      AssignmentStatus.PENDING_REVIEW,
    );
  });

  test('markAsDoneメソッドによってstatusがDONEのインスタンスが返される', () => {
    const assignment = Assignment.create({
      title: 'title',
      description: 'description',
    });
    const doneAssignment = assignment.markAsDone();
    expect((doneAssignment as any).status).toBe(AssignmentStatus.DONE);
  });
});
