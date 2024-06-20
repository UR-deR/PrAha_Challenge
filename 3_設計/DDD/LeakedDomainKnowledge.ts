// ドメイン層
// ドメイン知識が表現されていない
class User {
  constructor(public readonly id: string, public readonly name: string, public readonly password: string) {}
}

// アプリケーション層でドメイン知識が表現されている
class RegisterPasswordUseCase {
  constructor() {}

  execute(password: string) {
    if (!password.match(/^[a-zA-Z0-9]+$/)) {
      throw new Error(`Password must consist of alphanumeric characters. password: ${password}`);
    }
    // パスワード登録処理に進む
  }
}

class UpdatePasswordUseCase {
  constructor() {}

  execute(password: string) {
    if (!password.match(/^[a-zA-Z0-9]+$/)) {
      throw new Error(`Password must consist of alphanumeric characters. password: ${password}`);
    }
    // パスワード更新処理に進む
  }
}
