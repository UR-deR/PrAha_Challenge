/**
 * 例１: Personクラス
 * アプリケーション全体でフルネームとして扱いたい
 * しかし、Personクラスはフルネームを表現するプロパティを持っていない
 * そのため、アプリケーション層でフルネームを表現するロジックを書く必要がある
 * アプリケーション全体でどのように名前を扱うのかの振る舞いをドメイン層に定義すべき NOT アプリケーション層（呼び出し側）
 */
class Person {
  private _firstName: string;
  private _lastName: string;

  constructor(firstName: string, lastName: string) {
    this._firstName = firstName;
    this._lastName = lastName;
  }

  // フルネームのみを扱う場合、以下のようなgetterを用意するべきではない。ルールが崩れる
  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  set lastName(lastName: string) {
    this._lastName = lastName;
  }
}

/**
 * 例２: PullRequestクラス
 */

interface User {
  id: number;
  name: string;
}

class Reviewer implements User {
  constructor(public id: number, public name: string) {}
}

class Author implements User {
  constructor(public id: number, public name: string) {}
}

enum PullRequestStatus {
  Open,
  Closed,
  Merged,
  Draft,
}

class PullRequest {
  constructor(
    public id: number,
    public title: string,
    public author: Author,
    public reviewers: Reviewer[],
    public status: PullRequestStatus,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}

const pullRequest = new PullRequest(
  1,
  'Add a new feature',
  new Author(1, 'hoge'),
  [new Reviewer(2, 'fuga')],
  PullRequestStatus.Open,
  new Date(),
  new Date()
);

//　問題点１： ステータスが変更されるが、更新日時が変更されない。不整合が生じる
// statusが更新される時にupdatedAtも更新されるようにドメイン層で表現すべきである
pullRequest.status = PullRequestStatus.Closed;

//問題点２： アプリケーション層でドメイン知識を表現しないといけない
// アプリケーション層に以下のようなロジックを書く必要があり、ドメイン知識が点在してしまう
if (pullRequest.title.length > 50) {
  throw new Error('title is too long');
}
