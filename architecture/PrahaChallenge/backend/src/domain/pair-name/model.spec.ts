import { PairName } from './model';

describe('PairName', () => {
  describe('constructor', () => {
    test('有効な値を指定するとPairNameのインスタンスが作成される', () => {
      const validValue = 'A';
      const pairName = new PairName(validValue);
      expect(pairName.value).toBe(validValue);
    });

    test('無効な名前の長さの場合にエラーがスローされる', () => {
      const invalidValue = 'AB';
      expect(() => new PairName(invalidValue)).toThrowError(
        'Invalid name length. given: 2',
      );
    });

    test('非アルファベットの文字が指定された場合にエラーがスローされる', () => {
      const invalidValue = '1';
      expect(() => new PairName(invalidValue)).toThrowError(
        'Name must be alphabet. given: 1',
      );
    });
  });
});
