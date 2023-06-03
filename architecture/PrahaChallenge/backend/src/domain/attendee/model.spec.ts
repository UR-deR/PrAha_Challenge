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
  test('resignメソッドによってstatusがRESIGNEDになる', () => {
    const { status } = Attendee.create({
      name: 'name',
      email: new Email('test@test.com'),
    }).resign();
    expect(status).toBe(AttendeeStatus.RESIGNED);
  });

  test('stayAwayメソッドによってstatusがSTAY_AWAYになる', () => {
    const { status } = Attendee.create({
      name: 'name',
      email: new Email('test@test.com'),
    }).stayAway();
    expect(status).toBe(AttendeeStatus.STAY_AWAY);
  });
});
