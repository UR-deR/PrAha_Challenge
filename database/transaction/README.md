### 課題 1

> デッドロックの説明

デッドロックとは、複数のトランザクションが、互いに相手が所有するロックが解放されるのを待機して処理が進まなくなってしまう状態。共有ロック・排他ロックが両方使われる場合と、排他ロックが複数使われる場合に発生する。

変換デッドロックとサイクルデッドロックの 2 種類のデッドロックが存在する。

**変換デッドロック**

```sql
mysql(A)> begin;
Query OK, 0 rows affected (0.00 sec)

mysql(A)> select * from numbers where id = 1 for share;
+----+-------+
| id | value |
+----+-------+
|  1 |    30 |
+----+-------+
1 row in set (0.00 sec)

mysql(B)> begin;
Query OK, 0 rows affected (0.00 sec)

mysql(B)> select * from numbers where id = 1 for share;
+----+-------+
| id | value |
+----+-------+
|  1 |    30 |
+----+-------+
1 row in set (0.00 sec)

-- ロック待ちになり、 相手がデッドロックでロールバックされてから実行される
mysql(A)> update numbers set value = 100 where id = 1;
Query OK, 1 row affected (4.34 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql(B)> update numbers set value = 100 where id = 1;
ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
```

**サイクルデッドロック**

```sql
mysql(A)> begin;
Query OK, 0 rows affected (0.00 sec)

mysql(B)> begin;
Query OK, 0 rows affected (0.00 sec)

mysql(A)> select * from numbers where id = 1 for update;
+----+-------+
| id | value |
+----+-------+
|  1 |    30 |
+----+-------+
1 row in set (0.02 sec)

mysql(B)> select * from numbers where id = 2 for update;
+----+-------+
| id | value |
+----+-------+
|  2 |    10 |
+----+-------+
1 row in set (0.00 sec)

mysql(A)> select * from numbers where id = 2 for update;
-- ロック待ちになり、Bがデッドロックでロールバックされてから表示される
+----+-------+
| id | value |
+----+-------+
|  2 |    10 |
+----+-------+
1 row in set (6.82 sec)

mysql(B)> select * from numbers where id = 1 for update;
ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
```

> デッドロックの事例

```sql
CREATE TABLE products (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(191) NOT NULL
);

-- 在庫
CREATE TABLE inventories (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  current_quantity INT NOT NULL,

  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT ON UPDATE CASCADE----重要
);

-- 入荷
CREATE TABLE arrivals (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  inventory_id INT NOT NULL,
  quantity INT NOT NULL,
  arrived_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (inventory_id) REFERENCES inventories(id) ON DELETE RESTRICT ON UPDATE CASCADE----重要
);
```

入荷があるごとに入荷レコードを登録し、関連する在庫の在庫数を更新するシステム。

```sql
-- T1で入荷を登録
mysql(T1)> begin;
Query OK, 0 rows affected (0.00 sec)

mysql(T1)> insert into arrivals (inventory_id, quantity) values (1, 10);
Query OK, 1 row affected (0.04 sec)

-- T2で入荷を登録
mysql(T2)> begin;
Query OK, 0 rows affected (0.00 sec)

mysql(T2)> insert into arrivals (inventory_id, quantity) values (1, 20);
Query OK, 1 row affected (0.02 sec)

--- T1で在庫を更新しようとすると、ロック待ちになる
mysql(T1)> update inventories set current_quantity = current_quantity + 10 where id = 1;

---T2でも在庫を更新すると、デッドロックになる
mysql(T2)> update inventories set current_quantity = current_quantity + 20 where id = 1;
ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
```

デッドロックが発生したのは、共有ロックがかかったデータに、2 つのトランザクションから排他ロックを取得しようとしたため。
なぜ共有ロックが取得されるか  
→ 入荷に INSERT するときに、外部キーで参照する在庫レコードに共有ロックが設定されるから

> FOREIGN KEY 制約がテーブル上で定義されている場合は、制約条件をチェックする必要がある挿入、更新、または削除が行われると、制約をチェックするために、参照されるレコード上に共有レコードレベルロックが設定されます。
> [MySQL :: MySQL 8.0 リファレンスマニュアル :: 15.7.3 InnoDB のさまざまな SQL ステートメントで設定されたロック](https://dev.mysql.com/doc/refman/8.0/ja/innodb-locks-set.html)

対策  
→ 共有ロックが取得される前に、排他ロックを取得する。

```sql
begin;
-- 最初に排他ロックを取得する
select id from inventories where id = {inventory_id} for update;
-- 排他ロックを取得しているため、ここで共有ロックは取得されない
insert arrivals (inventory_id, quantity) values ({inventory_id}, {quantity});
update inventories set current_quantity = current_quantity - quantity;
commit;
```

> ISOLATION LEVEL

トランザクション分離レベルは、データベースシステムにおいて複数のトランザクションが同時に実行される場合に、それらのトランザクションがどの程度相互に影響を及ぼすかを定義する概念である。

- 以下は一般的なトランザクション分離レベル（※特定の DBMS の分離レベルではない！）
  - InnoDB のデフォルト分離レベルは、REPEATABLE READ
  - InnoDB では、例外的に REPEATABLE READ でもファントムリードが生じない。

| Isolation Level | Dirty Read | Fuzzy read | Phantom read |
| --------------- | ---------- | ---------- | ------------ |
| READ UNCOMMITED | 恐れあり   | 恐れあり   | 恐れあり     |
| READ COMMITED   | 発生しない | 恐れあり   | 恐れあり     |
| REPEATABLE READ | 発生しない | 発生しない | 恐れあり     |
| SERIALIZABLE    | 発生しない | 発生しない | 発生しない   |

> 行レベルのロック、テーブルレベルのロックの違い

| ロックの種類       | 概要                               | 備考 |
| ------------------ | ---------------------------------- | ---- |
| 行ロック           | ある特定の 1 行のみをロックする    |      |
| テーブルロック     | ある特定のテーブル全体をロックする |      |
| データベースロック | データベース全体をロックする       |      |

- MySQL における行ロックとテーブルロック
  - 行ロックのメリット
    - 異なるセッションが異なる行にアクセスする場合、ロックの競合が少なくなる
    - ロールバックする変更が少なくなる
    - 1 つの行を長時間ロックできる
  - テーブルロックのメリット
    - 必要なメモリが比較的少なくなる
    - 単一のロックだけが必要なため、テーブルの大部分に対して使用する場合には高速
    - データの大部分に対して GROUP BY を頻繁に実行する場合や、テーブル全体を頻繁にスキャンする必要がある場合に高速

> 悲観ロックと楽観ロックの違い

| ロック方法 | 概要                                                                                                                                                                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 楽観ロック | データそのものはロックせず、更新対象のデータがデータ取得時と同じ状態であることを確認してから更新することで、データの整合性を保証する方式。その確認のために、Version を管理するためのカラムをもうけて（ロックキーと呼ばれる）、データ取得時の Version とデータ更新時の Version を比較する。       |
| 悲観ロック | 更新対象のデータを取得する前にロックをかけることで、他のトランザクションから更新されないようにする方式。トランザクション開始直後に更新対象となるレコードのロックを取得する。ロックされたレコードはトランザクションがコミットまたはロールバックされるまで、データの整合性を保証することができる。 |

> 共有ロックと排他ロックの違い

| ロックの厳しさ           | 概要                                                                 | 備考                                                                  |
| ------------------------ | -------------------------------------------------------------------- | --------------------------------------------------------------------- |
| 共有ロック               | 他のトランザクションからのデータの参照は可能だが、更新は不可能。<br> | 通常、SELECT 文で選択した行には自動的に共有ロックがかかる。           |
| 排他ロック（占有ロック） | 他のトランザクションからのデータの参照も更新も不可能。               | `SELECT~FOR UPDATE（NOWAIT）`文を実行する場合は、排他ロックがかかる。 |

> fuzzy-read と phantom-read の違い

**fuzzy-read**
トランザクション A でデータを複数回読み取っている途中で、トランザクション B でデータを更新してコミットした場合、トランザクション A で違う結果のデータを読み取ってしまう問題が起きる

1. トランザクション A でレコードを SELECT する。① となっている。
1. トランザクション B でレコードを ① から ② に UPDATE し、COMMIT する。
1. トランザクション A で同じレコードを再度 SELECT する。② となっている。

**phantom-read**
トランザクション A で一定の範囲のレコードに対して処理を行っている途中で、トランザクション B でデータを追加・削除してコミットした場合、トランザクション A で幻影のようにデータが反映されるため、処理の結果が変わってしまう問題が起きる。

1. トランザクション A でレコードを SELECT する。該当レコードがない。
1. トランザクション B でレコードを INSERT し、COMMIT する。
1. トランザクション A でレコードを SELECT する。2 で INSERT としたレコードが取得できる。

### 課題 2

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    balance INT
);

INSERT INTO users (id, name, balance)
VALUES
    (1, 'Alice', 1000),
    (2, 'Bob', 2000);
```

**Dirty Read**

セッション 1

```sql
-- トランザクションを開始
BEGIN TRANSACTION;

-- Alice の残高を表示
SELECT balance FROM users WHERE name = 'Alice';
-- （この時点ではAliceの残高は1000と表示される）

-- 一時的にAliceの残高を更新
UPDATE users SET balance = 1500 WHERE name = 'Alice';
-- （まだコミットしていないため、データベース内では更新されているが、トランザクション外からは見えない）

```

セッション 2

```sql
-- トランザクションを開始
BEGIN TRANSACTION;

-- Alice の残高を表示
SELECT balance FROM users WHERE name = 'Alice';
-- （セッション1での更新がまだコミットされていないため、ここではAliceの残高が1500と表示される）

```

**Fuzzy Read**

DDL

```sql
-- テーブルの作成と初期データの挿入
CREATE TABLE accounts (
    id INT PRIMARY KEY,
    account_name VARCHAR(50),
    balance INT
);

INSERT INTO accounts (id, account_name, balance)
VALUES
    (1, 'Alice', 1000),
    (2, 'Bob', 2000);
```

セッション 1

```sql
-- トランザクションを開始
BEGIN TRANSACTION;

-- Alice の残高を表示
SELECT balance FROM accounts WHERE account_name = 'Alice';
-- （この時点ではAliceの残高は1000と表示される）

-- 少し時間をおいてから、再度Aliceの残高を表示
SELECT balance FROM accounts WHERE account_name = 'Alice';
-- （再度の読み取り操作の間にセッション2での変更が入るような時間的な余裕を持たせる）

```

セッション 2

```sql
-- トランザクションを開始
BEGIN TRANSACTION;

-- Alice の残高を更新
UPDATE accounts SET balance = 1500 WHERE account_name = 'Alice';
-- （まだコミットしていないため、変更はセッション2内でのみ有効）

-- セッション2での更新をコミット
COMMIT;

```

セッション 1

```sql
-- セッション1でトランザクションを終了（コミット）
COMMIT;

-- トランザクション内での2回の読み取り操作の間に、セッション2での更新が入ったため、
-- 2回目の読み取り操作では変更されたデータが反映される可能性がある
```

**Phantom Read**

DDL

```sql
-- テーブルの作成と初期データの挿入
CREATE TABLE products (
    id INT PRIMARY KEY,
    product_name VARCHAR(50),
    price INT
);

INSERT INTO products (id, product_name, price)
VALUES
    (1, 'Item A', 10),
    (2, 'Item B', 20);
```

セッション 1

```sql
-- トランザクションを開始
BEGIN TRANSACTION;

-- productsテーブルの価格が10未満の行をカウント
SELECT COUNT(*) FROM products WHERE price < 10;
-- （この時点では価格が10未満の行は1行と表示される）

-- 少し時間をおいてから、同じクエリを再度実行
SELECT COUNT(*) FROM products WHERE price < 10;
-- （再度のクエリ実行の間にセッション2で新しい行が挿入されるような時間的な余裕を持たせる）

```

セッション 2

```sql
-- トランザクションを開始
BEGIN TRANSACTION;

-- 新しい商品を挿入
INSERT INTO products (id, product_name, price)
VALUES (3, 'Item C', 5);
-- （まだコミットしていないため、新しい行はセッション2内でのみ有効）

-- セッション2での変更をコミット
COMMIT;
```

セッション 1

```sql
-- セッション1でトランザクションを終了（コミット）
COMMIT;

-- トランザクション内で同じ条件の範囲クエリを2回実行し、その間にセッション2で新しい行が挿入されたため、2回目のクエリ実行結果が最初とは異なる可能性がある
```

> 映画チケット販売システム、楽観ロック or 悲観ロック

- 競合の可能性が限りなく低い
- 悲観ロックだと、ロックを取得したレコードの読み取りさえもできない

上記 2 点から、楽観ロックで良いと思った。

```js
class ReservationRepository {
  async getConnection() {
    // ...
  }

  async isAvailable(reservation) {
    const connection = await this.getConnection();
    const result = await connection.query('SELECT version FROM reservation WHERE seat_id = ? AND movie_id = ?', [
      reservation.seatId,
      reservation.movieId,
    ]);
    return result[0].version === reservation.version;
  }

  async reserve(reservation) {
    const connection = await this.getConnection();
    await connection.query('UPDATE reservation SET version = version + 1 WHERE seat_id = ? AND movie_id = ?', [
      reservation.seatId,
      reservation.movieId,
    ]);
    //予約の登録処理が続く
  }
}

class ReservationService {
  constructor() {
    this.reservationRepository = new ReservationRepository();
  }

  async reserve(reservation) {
    const connection = await this.reservationRepository.getConnection();
    try {
      await connection.beginTransaction();
      const isAvailable = await this.reservationRepository.isAvailable(reservation);
      if (!isAvailable) {
        throw new Error('Reservation is no longer available.');
      }
      await this.reservationRepository.reserve(reservation);

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    }
  }
}
```

### 課題 3

## クイズ 1

- MySQL8.0 以降では、ロックに関して`NOWAIT`と`SKIP LOCKED`の機能が新たに追加されました。
  - この 2 つがどんな機能か調べてみましょう。

<details><summary>想定回答</summary>

- まず、どちらの機能もロックのレベルは、行ロックとなる。
- `NOWAIT`

  - 通常はロックがかかっている場合は解除されるまで待機するが、これが指定されている場合は、クエリがすぐに実行され、リクエストされた行がロックされている場合はエラーが返る
  - 処理を待たせたくないアプリケーションの場合に有効。

- `SKIP LOCKED`

  - クエリはすぐに実行され、ロックされた行に関しては結果に含まれない
  - そのため、このオプションを使用した場合、一貫性のないデータが返却されることになる。公式では、コレは一般的なトランザクション処理では非推奨とされている。

- 参考
  - [MySQL8.0 15.7.2.4 読取りのロック](https://dev.mysql.com/doc/refman/8.0/ja/innodb-locking-reads.html)

</details>

## クイズ 2

- MySQL では、行ロックが解除されるまで InnoDB が待機する時間を定義するシステム変数が存在します。その変数はなんでしょうか？

<details><summary>想定回答</summary>

- `innodb_lock_wait_timeout`
  - この変数で指定されている秒数待機し、ロックが解除されない場合は以下のエラーを発行する

```sql
ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction
```

- また、この変数は行ロックの場合に有効であり、テーブルロックには適用されない。

- 参考
  - [MySQL8.0 15.14 InnoDB の起動オプションおよびシステム変数](https://dev.mysql.com/doc/refman/8.0/ja/innodb-parameters.html#sysvar_innodb_lock_wait_timeout)

</details>
