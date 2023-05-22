import { ulid } from 'ulid';

export class PairId {
  public constructor(private readonly _value: string) {}

  public static generate(): PairId {
    return new PairId(ulid());
  }

  get value(): string {
    return this._value;
  }
}
