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
}
