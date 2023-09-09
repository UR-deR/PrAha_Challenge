export class PairName {
  public readonly value: string;
  public constructor(value: string) {
    if (value.length !== 1) {
      throw new Error(`Invalid name length. given: ${value.length}`);
    }
    if (!/^[a-zA-Z]+$/.test(value)) {
      throw new Error(`Name must be alphabet. given: ${value}`);
    }
    this.value = value;
  }

  //TODO:別の場所に移動する
  private static readonly ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

  public static generate(existingPairs: PairName[]): PairName {
    const usedAlphabets = existingPairs.map(({ value }) => value);
    const unusedAlphabets = PairName.ALPHABET.split('').filter(
      (alphabet) => !usedAlphabets.includes(alphabet),
    );
    if (unusedAlphabets.length === 0) {
      throw new Error('failed to generate PairName due to no unused alphabet');
    }
    return new PairName(unusedAlphabets[0]);
  }
}
