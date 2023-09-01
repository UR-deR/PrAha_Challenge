import { AttendeeStatus } from '../attendee-status/model';
import { Email } from '../email/model';
import { Attendee } from './model';

describe('Attendee', () => {
  test('createメソッドによって生成されるインスタンスのstatusはACTIVEである', () => {
    const { status } = Attendee.create({
      name: 'name',
      email: new Email('test@test.com'),
    });
    expect(status).toBe(AttendeeStatus.ACTIVE);
  });
  test('updateStatusメソッドによってAttendeeStatusを更新できる', () => {
    const attendee = Attendee.create({
      name: 'name',
      email: new Email('test@test.com'),
    });
    const resignedAttendee = attendee.updateStatus(AttendeeStatus.RESIGNED);
    expect(resignedAttendee.status).toBe(AttendeeStatus.RESIGNED);
  });
});
