import { Email } from './email';

describe('email', () => {
  test('正規表現にマッチする文字列を渡すと、Emailオブジェクトが生成される', () => {
    expect(new Email('test@test.com')).toBeInstanceOf(Email);
  });

  test('正規表現にマッチしない文字列を渡すと、エラーが発生する', () => {
    expect(() => new Email('test')).toThrowError(
      'Invalid email format. given: test',
    );
  });

  test('Emailオブジェクト同士を比較すると、値が一致していればtrueが返る', () => {
    const value = 'test@test.com';
    const email = new Email(value);
    const other = new Email(value);
    expect(email.equals(other)).toBeTruthy();
  });

  test('Emailオブジェクト同士を比較すると、値が一致していなければfalseが返る', () => {
    const email = new Email('test@test.com');
    const other = new Email('other@other.com');
    expect(email.equals(other)).toBeFalsy();
  });
});
