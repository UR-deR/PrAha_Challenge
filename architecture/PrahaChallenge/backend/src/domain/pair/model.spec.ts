import { Attendee } from '../attendee/model';
import { Email } from '../email/model';
import { PairName } from '../pair-name/model';
import { Pair } from './model';

const targetAttendee = Attendee.create({
  name: 'Michelle',
  email: new Email('piyo@piyo.com'),
});

describe('Pair', () => {
  let testAttendees: Attendee[];
  beforeEach(() => {
    testAttendees = [
      Attendee.create({
        name: 'Grace',
        email: new Email('test@test.com'),
      }),
      Attendee.create({
        name: 'Simon',
        email: new Email('hoge@hoge.com'),
      }),
    ];
  });

  test('removeAttendeeメソッドによって、Attendeeを脱退することができる', () => {
    const pair = Pair.create({
      name: new PairName('a'),
      attendees: [...testAttendees, targetAttendee],
    }).removeAttendee(testAttendees[2]);
    expect((pair as any).attendees).toStrictEqual([
      testAttendees[0],
      testAttendees[1],
    ]);
  });

  test('AddAttendeeメソッドによって、Attendeeを追加できる', () => {
    const pair = Pair.create({
      name: new PairName('a'),
      attendees: testAttendees,
    }).addAttendee(targetAttendee);
    expect((pair as any).attendees[2]).toBe(targetAttendee);
  });
});
