import { TeamName } from './model';

describe('TeamName', () => {
  test('チーム名が4桁の時エラーを投げる', () => {
    expect(() => new TeamName(1000)).toThrowError(
      'Team name must be less than 999 but got 1000',
    );
  });
  test('チーム名が負の数の時エラーを投げる', () => {
    expect(() => new TeamName(-1)).toThrowError(
      'Team name must be greater than 0 but got -1',
    );
  });
});
