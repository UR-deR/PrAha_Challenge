export class Email {
  private readonly value: string;

  constructor(value: string) {
    if (!/^[\w\d.!#$%&'*+\/=?^_`{|}~-]+@[\w\d-]+(?:\.[\w\d-]+)*$/.test(value)) {
      throw new Error(`Invalid email format. given: ${value}`);
    }
    this.value = value;
  }

  public equals(other: Email): boolean {
    return this.value === other.value;
  }
}
