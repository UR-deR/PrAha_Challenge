## 課題１

### 外部キー制約を一切定義しないと

- 存在しない参照先 id が入る余地を与えてしまう

**students テーブル**

| id  | name     | department_id                       |
| --- | -------- | ----------------------------------- |
| 1   | William  | 2                                   |
| 2   | Grace    | 1                                   |
| 3   | Simon    | 1                                   |
| 4   | Michelle | 6(存在しない参照先 id が入っている) |
| 5   | Steve    | 3                                   |

**departments テーブル**

| id  | name     |
| --- | -------- |
| 1   | 工学部   |
| 2   | 法学部   |
| 3   | 文学部   |
| 4   | 医学部   |
| 5   | 経済学部 |

### 外部キー制約を定義すると

`ON DELETE CASCADE`や`ON DELTE SET NULL`などを指定すると、レコード削除時に 紐付く child のレコードに対しての処理も走るため、トランザクションが大きくなり、パフォーマンスが悪化しうる。

## 課題 2

例として以下のテーブルを想定する。

```sql
-- Create syntax for TABLE 'categories'
CREATE TABLE `categories` (
  `id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create syntax for TABLE 'items'
CREATE TABLE `items` (
  `id` int(11) unsigned NOT NULL,
  `category_id` int(11) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `items` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON UPDATE RESTRICT;

INSERT INTO categories VALUES (1), (2), (3);
INSERT INTO items VALUES (1, 3);
```

**categories テーブル**
| id |
| - |
| 1 |
| 2 |
| 3 |

**items テーブル**
| id | category_id |
| --- | ---------- |
| 1 | 3 |

### RESTRICT

```sql
-- カテゴリIDをUPDATEしてみる
UPDATE categories SET id = 4 WHERE id = 2; -- 成功
UPDATE categories SET id = 6 WHERE id = 3; -- 失敗
```

`CASCADE`のように、紐づく child が削除・更新されたりするのを待ちたくないが、参照整合性を DB 側で保ちたいケースで用いる。アプリケーション側で参照関係を把握し、child から先に削除・更新するようにする実装が必要。

### CASCADE

```sql
-- カテゴリIDをUPDATEしてみる
UPDATE categories SET id = 4 WHERE id = 2; -- 成功
UPDATE categories SET id = 6 WHERE id = 3; -- 成功
```

**更新後の items テーブル**

カテゴリの UPDATE に追従して、`items.category_id` も更新される
| id | category_id |
| --- | ---------- |
| 1 | 6 |

parent が削除・更新されたら child も絶対に削除・更新されなければいけないケースで用いる。紐づく child が多い場合、パフォーマンス面で懸念点あり。

### SET NULL

```sql
-- カテゴリIDをUPDATEしてみる
UPDATE categories SET id = 4 WHERE id = 2; -- 成功
UPDATE categories SET id = 6 WHERE id = 3; -- 成功
```

**更新後の items テーブル**

参照先の category_id(今回は 3) のレコードが存在しなくなったため `NULL` が SET される。
| id | category_id |
| --- | ----------- |
| 1 | NULL |

NULL がセットされているレコードに対して、サーバー負荷の少ない時間帯でバッチ処理する時などに削除・更新をしたりできる。ただ、SET NULL している間もユーザーは待たされることになるので、パフォーマンス面で懸念点あり。

### NO ACTION

```sql
-- カテゴリIDをUPDATEしてみる
UPDATE categories SET id = 4 WHERE id = 2; -- 成功
UPDATE categories SET id = 6 WHERE id = 3; -- 失敗
```

`RESTRICT`と同じ

### 従業員管理サービス

department が消失すると、その department に属する employee も消失することになる。

### プロジェクトマネジメントツール

サービスの性質上、担当者不在が許されないのであれば、担当者が退職などでプロジェクトを去ってしまった際に`assignee_id`が NULL になるため、担当者不在となり NG である。NULL ではなく、DEFAULT 値として 任意の assignee を設定するなどの対応が必要に思う。

### Active Record

=>`RESTRICT`

https://stackoverflow.com/questions/35582637/default-dependent-action-when-calling-destroy-in-activerecord-rails

### Eloquent

=>`RESTRICT`

https://stackoverflow.com/questions/39518162/available-actions-for-onupdate-ondelete-in-laravel-5-x

`CASCADE`や`NULL`は副作用をもたらすので、デフォルトでこれらになっていると設定漏れをしてしまった時の影響が大きくなるから、デフォルトは`RESTRICT`に設定しているのだと思う。

### MySQL と PostgreSQL の違い

**MySQL**

違いなし。

**PostgreSQL**

RESTRICT：被参照行を削除するのを防ぎます。制約のチェックをトランザクション中で後回しにすることができない。

NO ACTION：制約がチェックされた時に参照行がまだ存在していた場合に、エラーとなる。チェックをトランザクション中で後回しにすることができる

https://www.postgresql.jp/document/8.0/html/ddl-constraints.html#:~:text=%E5%89%8A%E9%99%A4%E3%81%AE%E5%88%B6%E9%99%90,%E5%A4%B1%E6%95%97%E3%81%97%E3%81%BE%E3%81%99%E3%80%82

## 課題 3

### 外部キー制約クイズ

**Q1**
一つのテーブルにいくつの外部キー制約を設けることができるか。

**Q2**

外部キーは、親テーブルに複数の一致するレコードを持つことができるか？

**Q3**

外部キーは、親テーブルの複数の列を参照することはできるか？
