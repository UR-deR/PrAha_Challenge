import { PairId } from '../id/model';
import { TeamName } from '../team-name/model';
import { Team } from './model';

describe('Team Entity', () => {
  test('removePairメソッドによって、Pairを脱退することができる', () => {
    const team = Team.create({
      name: new TeamName(1),
      pairIds: ['hoge', 'fuga', 'fuga'].map((id) => new PairId(id)),
    }).removePair(new PairId('hoge'));
    expect(team.pairIds).toHaveLength(2);
    expect(team.pairIds).not.toContainEqual(new PairId('hoge'));
  });

  test('AddPairメソッドによって、Pairを追加できる', () => {
    const team = Team.create({
      name: new TeamName(1),
      pairIds: ['hoge', 'fuga'].map((id) => new PairId(id)),
    }).addNewPair(new PairId('piyo'));
    expect(team.pairIds).toHaveLength(3);
    expect(team.pairIds).toContainEqual(new PairId('piyo'));
  });
});
