// それぞれの値オブジェクトは別のファイルに置く想定だが、レビューしやすいと考え同一ファイルにまとめています。
enum BloodType {
  A = 'A',
  B = 'B',
  O = 'O',
  AB = 'AB',
}

class Birthdate {
  constructor(public readonly value: Date) {
    if (value > new Date()) throw new Error('birthdate must be in the past');
  }
}

class Human {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly bloodType: BloodType,
    public readonly birthdate: Birthdate
  ) {}
}

export {};
