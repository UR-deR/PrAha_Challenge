export class TeamName {
  public readonly value: number;
  constructor(value: number) {
    if (value > 999) {
      throw new Error(`Team name must be consist of 3 digits but got ${value}`);
    }
    if (value < 0) {
      throw new Error(`Team name must be greater than 0 but got ${value}`);
    }
    this.value = value;
  }
}
