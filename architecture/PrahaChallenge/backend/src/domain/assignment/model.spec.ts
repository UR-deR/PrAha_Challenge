import { AssignmentStatus } from '../assignment-status/model';
import { Assignment } from './model';

describe('Assignment', () => {
  test('markAsPendingReviewメソッドによってstatusがPENDING_REVIEW', () => {
    const assingment = new Assignment('1', 'title', 'description');
    expect((assingment.markAsPendingReview() as any).status).toBe(
      AssignmentStatus.PENDING_REVIEW,
    );
  });

  test('markAsDoneメソッドによってstatusがDONEのインスタンスが返される', () => {
    const assingment = new Assignment('1', 'title', 'description');
    expect((assingment.markAsDone() as any).status).toBe(AssignmentStatus.DONE);
  });
});
