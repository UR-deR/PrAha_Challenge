class Person {
  public readonly name: string;
  public readonly starWorkingAt: Date;
  public readonly email: string;
  public readonly age: number;
  public readonly password: string;
  constructor(name: string, startWorkingAt: Date, email: string, age: number, password: string) {
    this.name = name;
    this.starWorkingAt = startWorkingAt;
  }
  private copy({ name = this.name, email = this.email, age = this.age, password = this.password }): Person {
    return new Person(name, this.starWorkingAt, email, age, password);
  }

  public changeName(name: string) {
    return this.copy({ name });
  }

  public changeEmail(email: string) {
    return this.copy({ email });
  }

  public changePassword(password: string) {
    return this.copy({ password });
  }
}

class Company {
  public people: Person[];
  constructor(people: Person[]) {
    this.people = people;
  }
}

const taro = new Person('taro', new Date(), 'xxx@yyyy.com', 20, 'password');
taro.name = 'jiro'; // readonlyなので更新できない

const jiro = taro.changeName('jiro'); // changeNameで新規インスタンスを生成して更新できる
