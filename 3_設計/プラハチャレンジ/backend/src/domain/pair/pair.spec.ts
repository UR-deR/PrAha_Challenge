import { PairId, ParticipantId } from '../id/id';
import { Pair } from './pair';
import { PairName } from './pair-name';

describe('create', () => {
  it('should throw error when given member count is less than 2', () => {
    expect(() => Pair.create([new ParticipantId('hoge')], [])).toThrowError();
  });
  it('should throw error when given member count is more than 3', () => {
    expect(() =>
      Pair.create(
        [
          new ParticipantId('hoge'),
          new ParticipantId('fuga'),
          new ParticipantId('piyo'),
          new ParticipantId('foo'),
        ],
        [],
      ),
    ).toThrowError();
  });
  it('should return Pair', () => {
    expect(
      Pair.create([new ParticipantId('hoge'), new ParticipantId('fuga')], []),
    ).toBeInstanceOf(Pair);
  });
});

describe('reconstruct', () => {
  it('should return Pair', () => {
    expect(
      Pair.reconstruct({
        id: new PairId('hoge'),
        name: new PairName('a'),
        pairMemberIds: [new ParticipantId('hoge'), new ParticipantId('fuga')],
      }),
    ).toBeInstanceOf(Pair);
  });
});

describe('exchangeMembers', () => {
  it('can exchange Members', () => {
    const newPair = Pair.reconstruct({
      id: new PairId('hoge'),
      name: new PairName('a'),
      pairMemberIds: [new ParticipantId('hoge'), new ParticipantId('fuga')],
    }).exchangeMembers(new ParticipantId('hoge'), new ParticipantId('foo'));

    expect(newPair.pairMemberIds).toEqual([
      new ParticipantId('foo'),
      new ParticipantId('fuga'),
    ]);
  });
});
