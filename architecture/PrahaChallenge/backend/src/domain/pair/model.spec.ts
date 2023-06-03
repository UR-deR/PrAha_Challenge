import { AttendeeId } from '../id/model';
import { PairName } from '../pair-name/model';
import { Pair } from './model';

describe('Pair Entity', () => {
  test('removeAttendeeメソッドによって、Attendeeを脱退することができる', () => {
    const pair = Pair.create({
      name: new PairName('a'),
      pairMemberAttendeeIds: ['hoge', 'fuga', 'fuga'].map(
        (id) => new AttendeeId(id),
      ),
    }).removeAttendee(new AttendeeId('hoge'));
    expect(pair.pairMemberAttendeeIds).toHaveLength(2);
    expect(pair.pairMemberAttendeeIds).not.toContainEqual(
      new AttendeeId('hoge'),
    );
  });

  test('AddAttendeeメソッドによって、Attendeeを追加できる', () => {
    const pair = Pair.create({
      name: new PairName('a'),
      pairMemberAttendeeIds: ['hoge', 'fuga'].map((id) => new AttendeeId(id)),
    }).addAttendee(new AttendeeId('piyo'));
    expect(pair.pairMemberAttendeeIds).toHaveLength(3);
    expect(pair.pairMemberAttendeeIds).toContainEqual(new AttendeeId('piyo'));
  });
});
