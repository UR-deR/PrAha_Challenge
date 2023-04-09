class User {
  constructor(public id: number, public name: string, public email: string) {}
}

interface UserDomainService {
  isDuplicatedEmail(user: User): boolean;
}

class UserDomainServiceImpl implements UserDomainService {
  private users: User[] = []; // 仮にDBから取得したユーザー一覧を想定

  public isDuplicatedEmail(user: User): boolean {
    return this.users.some((u) => u.email === user.email);
  }
}

export {};
