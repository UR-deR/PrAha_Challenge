// Humanに限らず、別の生物でも使えるようにしたい場合には、それぞれの値オブジェクトの名前を変更する必要がある。CreatureId, CreatureName, CreatureBloodType, CreatureBirthdateなど

enum HumanBloodType {
  a = 'a',
  b = 'b',
  o = 'o',
  ab = 'ab',
}

class HumanBirthdate {
  constructor(public readonly value: Date) {
    const age = new Date().getFullYear() - value.getFullYear();
    if (age < 20) {
      throw new Error(`Age must be over 20. birthdate: ${value}, age: ${age}`);
    }
  }
}

class HumanName {
  constructor(public readonly value: string) {
    if (value.length >= 20) {
      throw new Error(`Name must be under 20 characters. name: ${value}`);
    }
  }
}

class HumanId {
  constructor(public readonly value: string) {
    if (!value.match(/^[a-zA-Z0-9]+$/)) {
      throw new Error(`Id must consist of alphanumeric characters. id: ${value}`);
    }
  }
}

class Human {
  constructor(
    public readonly id: HumanId,
    public readonly name: HumanName,
    public readonly bloodType: HumanBloodType,
    public readonly birthdate: HumanBirthdate
  ) {}
}

// コンパイルエラーが発生しないことを確認するためのコード
const me = new Human(
  new HumanId('myid'),
  new HumanName('myname'),
  HumanBloodType.a,
  new HumanBirthdate(new Date('2000-01-01'))
);
