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

> ISOLATION LEVEL

トランザクション分離レベルは、データベースシステムにおいて複数のトランザクションが同時に実行される場合に、それらのトランザクションがどの程度相互に影響を及ぼすかを定義する概念である。

一般的に、主に4つの分離レベルがある。
- READ UNCOMMITTED
- READ COMMITTED
- REPEATABLE READ
- SERIALIZABLE

**READ UNCOMMITTED**  
他の処理によって行われている、書きかけのデータまで読み取る。  
PHANTOM 、NON-REPEATABLE READ 、さらに ダーティ・リード(Dirty Read) と呼ばれる現象（不完全なデータや、計算途中のデータを読み取ってしまう動作）が発生する。トランザクションの並行動作によってデータを破壊する可能性は高いが、その分性能は高い。

**READ COMMITTED**  
他のトランザクションによる更新については、常にコミット済みのデータのみを読み取る。  
ファントム・リード に加え、非再現リード(Non-Repeatable Read)と呼ばれる、同じトランザクション中でも同じデータを読み込むたびに値が変わってしまう現象が発生する可能性がある。

**REPEATABLE READ**  
ひとつのトランザクションが実行中の間、読み取り対象のデータが途中で他のトランザクションによって変更される心配はない。同じトランザクション中では同じデータは何度読み取りしても毎回同じ値を読むことができる。  
ただし ファントム・リード(Phantom Read) と呼ばれる現象が発生する可能性がある。ファントム・リードでは、並行して動作する他のトランザクションが追加したり削除したデータが途中で見えてしまうため、処理の結果が変わってしまう。

**SERIALIZABLE**  
複数の並行に動作するトランザクションそれぞれの結果が、いかなる場合でも、それらのトランザクションを時間的重なりなく逐次実行した場合と同じ結果となる。  
このような性質を直列化可能性（Serializability）と呼ぶ.SERIALIZABLEは最も強い分離レベルであり、最も安全にデータを操作できるが、相対的に性能は低い。ただし同じ結果とされる逐次実行の順はトランザクション処理のレベルでは保証されない。

