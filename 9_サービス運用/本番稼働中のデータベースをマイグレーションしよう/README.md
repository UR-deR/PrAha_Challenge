# 本番稼働中のデータベースをマイグレーションしよう
## 課題1

### expand and contract pattern

データベースのスキーマ変更を行う際に、アプリケーションのダウンタイムを最小化し、システムの可用性を維持するための段階的なマイグレーション手法

**1. Expand Phase**
スキーマを変更する際、まず新しい構造を追加する。この段階では、古いスキーマと新しいスキーマが共存する状態を作る。以下の操作を行う：

- 新しいカラムやテーブルを追加
  - 例: 古いカラムを削除せず、新しいカラムを追加。
- アプリケーションを改修して両方のスキーマを扱えるようにする
  - アプリケーションは古いスキーマのデータも扱いつつ、新しいスキーマにデータを書き込むようにする。
- データを同期
  古いスキーマのデータを新しいスキーマにコピーし、リアルタイムでデータが同期されるように設定する。

**2. Contract Phase**
新しいスキーマが安定し、古いスキーマが不要になったら古い構造を削除する。この段階では以下を行う：

- アプリケーションの変更
  - 古いスキーマを使用するロジックを削除し、新しいスキーマのみを使用。
- 古いスキーマの削除
  - 不要になったカラムやテーブルを削除。

### 開発環境と本番環境のDBマイグレーション

開発環境は開発者がDBのデータを自由に変更できるため、データが偏りがち。  
本番環境はさまざまなユーザーによって多様なデータがインサートされるため、カラムによってはNULLが入りうる。  

**対策1**  
対象のカラムが全てNULLでないことを確認し、NULL値が存在する場合は適切なデフォルト値で事前に置き換える。

```sql
UPDATE your_table
SET your_column = 'default_value'
WHERE your_column IS NULL;
```

**対策2**  
```sql
ALTER TABLE your_table
MODIFY your_column datatype DEFAULT 'default_value';
```
事前にデフォルト値で置き換えてからNOT NULL制約を課すようにする。

```sql
ALTER TABLE your_table
MODIFY your_column datatype NOT NULL;
```

## 課題2

ユーザが複数のペアに所属できるようにする必要があり、`Pair` と `User` テーブルの関係を多対多にしたい。

### 現在のスキーマ

```js
model User {
  id String @id
  name String
  pair Pair // 削除
}

model Pair {
  id String @id
  name String
  users User[]
}
```

### 変更後のスキーマ

```js
model User {
  id String @id
  name String
  pairs Pair[] @relation("UsersInPair")
}

model Pair {
  id String @id
  name String
  users User[] @relation("UsersInPair")
}
```

### 手順

expand and contract patternに倣って進める。

### pairsフィールド、users_newフィールドを追加

スキーマを以下のように変更して、`prisma migrate` を実行する。

複数のリレーションが発生するため、`@relation` を使用して対応づけを行う。

```prisma
model User {
  id String @id
  name String
  pair Pair @relation("UsersInPairOld")
  pairs Pair[] @relation("UsersInPair") // 追加
}

model Pair {
  id String @id
  name String
  users User[] @relation("UsersInPairOld")
  users_new User[] @relation("UsersInPair") // 追加
}
```

### アプリケーションを変更

ペア追加時、ペアのメンバー変更時に `User.pairs` と `Pair.users_new` にもデータを書き込む用に、アプリケーションを修正する。

### 過去のデータをコピー

以下のスクリプトを実行し、過去のデータをコピーする。

```ts
// ペア&ユーザーを取得
const pairsWithUserId = await this.context.prisma.pair.findMany({
  include: {
    users: {
      select: {
        id: true
      }
    }
  }
})

// ペアとユーザーを紐付ける
for (const pair of pairsWithUserId) {
  await this.context.prisma.pair.update({
    where: { id: pair.id },
    data: {
      users_new: {
        set: [],
        connect: pair.users
      }
    }
  })
}
```

### 問題がないか確認

`Pair.users` と `Pair.new_users` から取得できる内容が同じであることを確認する。

### 読み取り先を新しいスキーマに変更

データの読み取り時に、 `User.pairs` 、 `Pair.users_new` (新スキーマ)から読み取るようにアプリケーションを修正。

### 古いスキーマへの書き込みを停止

データ書き込み時に、 `User.pair` 、 `Pair.users` (旧スキーマ)への書き込みを行わないようにアプリケーションを修正。

### 古いスキーマを削除

以下のようにスキーマを変更して、 `prisma migrate` を実行する。 (`User.pair`, `Pair.users`を削除)

```js
model User {
  id String @id
  name String
  pairs Pair[] @relation("UsersInPair")
}

model Pair {
  id String @id
  name String
  users_new User[] @relation("UsersInPair")
}
```

### フィールド名を変更

以下のように変更して、 `prisma migrate` を実行する。 (`Pair.users_new` -> `Pair.users`)

```js
model User {
  id String @id
  name String
  pairs Pair[] @relation("UsersInPair")
}

model Pair {
  id String @id
  name String
  users User[] @relation("UsersInPair") // 変更
}
```

※フィールド名の変更のみなので、旧スキーマの削除と一緒でも良さそう。
