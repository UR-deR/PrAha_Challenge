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

// ドメインモデル貧血症のクラス
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
pullRequest.status = PullRequestStatus.Closed;

//問題点２： アプリケーション層でドメイン知識を表現しないといけない
// アプリケーション層に以下のようなロジックを書く必要があり、ドメイン知識が点在してしまう
if (pullRequest.title.length > 50) {
  throw new Error('title is too long');
}
