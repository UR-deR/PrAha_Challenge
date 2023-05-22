import { AttendeeStatus } from '../attendee-status/model';
import { Email } from '../email/model';
import { Attendee } from './model';

describe('Attendee', () => {
  test('resignメソッドによってstatusがRESIGNEDになる', () => {
    const attendee = Attendee.create({
      name: 'name',
      email: new Email('test@test.com'),
    }).resign();
    expect((attendee as any).status).toBe(AttendeeStatus.RESIGNED);
  });

  test('stayAwayメソッドによってstatusがSTAY_AWAYになる', () => {
    const attendee = Attendee.create({
      name: 'name',
      email: new Email('test@test.com'),
    }).stayAway();
    expect((attendee as any).status).toBe(AttendeeStatus.STAY_AWAY);
  });
});
