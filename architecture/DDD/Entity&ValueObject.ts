// EntityとValue Objectの例
// 1. Entityの例
class Customer {
  private id: number;
  private name: string;
  private email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  // some behaviors
}

const customer1 = new Customer(1, 'John', 'john@example.com');
const customer2 = new Customer(2, 'Alice', 'alice@example.com');

console.log(customer1 === customer2); // false
// 識別子（id）が異なるため、別のEntityとして扱われる

// 2. Value Objectの例

class Money {
  private amount: number;
  private currency: string;

  constructor(amount: number, currency: string) {
    this.amount = amount;
    this.currency = currency;
  }

  // some behaviors

  // Value Object同士の等価性を比較するメソッド
  public equals(other: Money): boolean {
    return this.amount === other.amount && this.currency === other.currency;
  }
}

const money1 = new Money(1000, 'JPY');
const money2 = new Money(1000, 'JPY');

console.log(money1.equals(money2)); // true
// 属性（amount, currency）が等しいため、等価とみなされる
