import { PairName } from './pair-name';

describe('constructor', () => {
  it('should throw error when given name is not alphabet', () => {
    expect(() => new PairName('1')).toThrowError();
  });
  it('should throw error when given name is not single character', () => {
    expect(() => new PairName('ab')).toThrowError();
  });
  it('should not throw error when given name is single alphabet', () => {
    expect(() => new PairName('a')).not.toThrowError();
  });
});
describe('generate', () => {
  it('should throw error when no unused alphabet', () => {
    expect(() =>
      PairName.generate(
        [
          'a',
          'b',
          'c',
          'd',
          'e',
          'f',
          'g',
          'h',
          'i',
          'j',
          'k',
          'l',
          'm',
          'n',
          'o',
          'p',
          'q',
          'r',
          's',
          't',
          'u',
          'v',
          'w',
          'x',
          'y',
          'z',
        ].map((alphabet) => new PairName(alphabet)),
      ),
    ).toThrowError();
  });
  it('should return unused alphabet', () => {
    expect(PairName.generate([new PairName('b')]).value).toEqual('a');
  });
});
