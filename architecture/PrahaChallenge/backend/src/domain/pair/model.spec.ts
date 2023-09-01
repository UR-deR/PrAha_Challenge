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

  test('AcceptAttendeeメソッドによって、Attendeeを追加できる', () => {
    const pair = Pair.create({
      name: new PairName('a'),
      pairMemberAttendeeIds: ['hoge', 'fuga'].map((id) => new AttendeeId(id)),
    }).acceptAttendee(new AttendeeId('piyo'));
    expect(pair.pairMemberAttendeeIds).toHaveLength(3);
    expect(pair.pairMemberAttendeeIds).toContainEqual(new AttendeeId('piyo'));
  });

  test('インスタンス生成時に参加者が2人未満の場合エラーを投げる', () => {
    expect(() =>
      Pair.create({
        name: new PairName('a'),
        pairMemberAttendeeIds: ['hoge'].map((id) => new AttendeeId(id)),
      }),
    ).toThrowError();
  });

  test('インスタンス生成時に参加者が4人以上の場合エラーを投げる', () => {
    expect(() =>
      Pair.create({
        name: new PairName('a'),
        pairMemberAttendeeIds: ['hoge', 'fuga', 'piyo', 'bazz'].map(
          (id) => new AttendeeId(id),
        ),
      }),
    ).toThrowError();
  });
});
