import { AssignmentStatus } from '../assignment-status/model';
import { Assignment } from './model';

describe('Assignment', () => {
  test('markAsPendingReviewメソッドによってstatusがPENDING_REVIEW', () => {
    const assignment = Assignment.create('title', 'description');
    assignment.markAsPendingReview();
    expect((assignment as any).status).toBe(AssignmentStatus.PENDING_REVIEW);
  });

  test('markAsDoneメソッドによってstatusがDONEのインスタンスが返される', () => {
    const assignment = Assignment.create('title', 'description');
    assignment.markAsDone();
    expect((assignment as any).status).toBe(AssignmentStatus.DONE);
  });
});
