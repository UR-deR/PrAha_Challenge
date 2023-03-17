class Person {
  public readonly name: string;
  public readonly starWorkingAt: Date;
  public readonly email: string;
  public readonly age: number;
  public readonly password: string;
  constructor(name: string, startWorkingAt: Date) {
    this.name = name;
    this.starWorkingAt = startWorkingAt;
  }
  private copy({ name = this.name, startWorkingAt = this.starWorkingAt }): Person {
    return new Person(name, startWorkingAt);
  }

  public changeName(name: string) {
    return this.copy({ name });
  }
}

class Company {
  public people: Person[];
  constructor(people: Person[]) {
    this.people = people;
  }
}

const taro = new Person('taro', new Date());
taro.name = 'jiro'; // readonlyなので更新できない

const jiro = taro.changeName('jiro'); // changeNameで新規インスタンスを生成して更新できる
