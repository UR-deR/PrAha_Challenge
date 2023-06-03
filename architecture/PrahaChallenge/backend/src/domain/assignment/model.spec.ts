import { AssignmentStatus } from '../assignment-status/model';
import { Assignment } from './model';

describe('Assignment', () => {
  test('markAsPendingReviewメソッドによってstatusがPENDING_REVIEW', () => {
    const assignment = Assignment.create({
      title: 'title',
      description: 'description',
    });
    const { status } = assignment.markAsPendingReview();
    expect(status).toBe(AssignmentStatus.PENDING_REVIEW);
  });

  test('markAsDoneメソッドによってstatusがDONEのインスタンスが返される', () => {
    const assignment = Assignment.create({
      title: 'title',
      description: 'description',
    });
    const { status } = assignment.markAsDone();
    expect(status).toBe(AssignmentStatus.DONE);
  });

  test('createメソッドによって生成されるインスタンスのstatusはUNTOUCHEDである', () => {
    const { status } = Assignment.create({
      title: 'title',
      description: 'description',
    });

    expect(status).toBe(AssignmentStatus.UNTOUCHED);
  });

  test('statusがDONEのAssignmentのstatusを更新しようとするとエラーが投げられる', () => {
    const doneAssignment = Assignment.create({
      title: 'title',
      description: 'description',
    }).markAsDone();

    expect(() => doneAssignment.markAsPendingReview()).toThrowError();
  });
});
