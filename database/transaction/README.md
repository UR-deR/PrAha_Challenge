### 課題1

> デッドロックの説明

デッドロックとは、複数のトランザクションが、互いに相手が所有するロックが解放されるのを待機して処理が進まなくなってしまう状態。共有ロック・排他ロックが両方使われる場合と、排他ロックが複数使われる場合に発生する。

変換デッドロックとサイクルデッドロックの2種類のデッドロックが存在する。



**変換デッドロック**  
共有ロック+排他ロック

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
排他ロック+排他ロック


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