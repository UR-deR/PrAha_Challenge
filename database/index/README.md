### 課題１

**インデックスの仕組み**

インデックスの各ノードは双方向連結リストであり、各ノードの中にインデックスが貼られたカラムの値が格納されている。

> 双方向連結リスト
>
> 各ノードが前後のノードの情報を持っているコレクション。

![fuga](https://use-the-index-luke.com/static/fig01_01_index_leaf_nodes.ja.NS5zx69O.png)

インデックスが作成されていない場合は、テーブルを頭から順番に調べていくため走査に多くの時間を要する。
インデックスを作成すると、以下の画像のようなバランス検索木（B ツリー）が作成される。

![hoge](https://poppingcarp.com/wp-content/uploads/2021/11/index-page_data-page.svg)

インデックスによる検索は以下のように行われる。

1. IndexPage の B ツリーを走査する
1. リーフノードチェーンをたどる
1. Data Page のテーブルからデータを読み取る（Data Page にアクセスしなくて済むことも）

したがって、

- Data Page との I/O を減らせる
- 欲しいデータへの走査の時間が短い
- Index Page の各ノードはデータ量が少ない

ため、インデックスによってクエリの高速化が期待できる。

**slow query log を調べる理由**

slow query log を調べることで、実行に時間がかかり、最適化の候補となるクエリを見つけることができる。例えば、mysqlslowdump を使って、slow query を解析すると、以下のような情報を得られる。

```sh
/# mysqldumpslow /var/lib/mysql/84d4fcc06879-slow.log

Reading mysql slow query log from /var/lib/mysql/84d4fcc06879-slow.log
Count: 2  Time=0.07s (0s)  Lock=0.00s (0s)  Rows=8248.0 (16496), root[root]@localhost
  select * from zipcode where prefecture = 'S'

Count: 1  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@localhost
  select * from zipcode where prefecture = 'S' limit N

Count: 1  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@localhost
  select * from zipcode limit N
```

slow query を調べずに闇雲にインデックスを貼りまくると、SELECT 以外の DML に悪影響を及ぼす。

**INSERT**

インデックスはデータの検索速度を向上させるが、それを保つためには新しいエントリを追加する際にもインデックスを更新する必要がある。したがって、インデックスがある場合、データベースは新しいエントリをテーブルに挿入する際にそれらのインデックスも更新する必要がある。
インデックスの数が増えると、挿入操作の実行コストも増加します。つまり、インデックスの数は挿入文の実行コストに乗数のような影響を及ぼします。
したがって、どのカラムにインデックスを貼るのかは吟味する必要がある。

![インデックスの数による挿入のパフォーマンス変化](https://use-the-index-luke.com/static/fig08_01_insert.ja.tj3OKCEx.png)

**UPDATE**

UPDATE 文のパフォーマンスも INSERT と同様に、インデックスの数に依存する。
UPDATE 文は INSERT 文と違って、更新対象のカラムのインデックスのみの更新で良いため、INSERT 文よりはパフォーマンス的に優位である。全カラム更新する場合はインデックス数の影響を受けるため、ORM を使っている場合は生成された SQL を認識しておいた方が良い。

![インデックスと列数による更新のパフォーマンス変化](https://use-the-index-luke.com/static/fig08_03_update.ja.X-qI9-ju.png)

**DELETE**

DELETE 文も上記 2 つと同様に、インデックス数が多いほどパフォーマンスは低減する。逆に、インデックスが全く設定されていないと、削除対象のレコードをフルスキャンで走査しないといけないため、見つけるまでに時間がかかる。適切なカラムにインデックスを貼るのが大事。

![インデックスの数による削除のパフォーマンス変化](https://use-the-index-luke.com/static/fig08_02_delete.ja.oeageTzM.png)

したがって、闇雲にインデックスを貼るのではなく、slow query を活用してインデックスを貼るべきかラムを計測しながら吟味する必要がある。

**カーディナリティとは**

カーディナリティは、データベースにおいて特定のカラム（列）内に存在する異なる値の数を示す指標である。単純に言えば、あるカラム内のユニークな値の数を意味する。

たとえば、"性別"というカラムがある場合、そのカラムのカーディナリティは通常 2 になる（男性と女性の 2 つの異なる値が存在するため）。しかし、"都道府県"というカラムの場合、カーディナリティは 47（日本の都道府県数）になる。

高いカーディナリティを持つカラムは、その値が多様であるため、インデックスを効果的に利用することができる。一方で、低いカーディナリティを持つカラムは、インデックスを使っても効率的な検索が難しい場合がある。

**カバリングインデックス**

インデックスのおかげでテーブルにアクセスせずに求めている結果を得られることをカバリングインデックスという。テーブルにアクセスしないので、当然パフォーマンスは良いが、インデックスのみのスキャンの優位性は、アクセスされる行数と、クラスタ化係数によって決まる

インデックススキャンの実現のために無闇にインデックスを貼りまくると、SELECT 以外の DML のパフォーマンスを損なうことになるので、インデックスを貼るカラムは吟味する必要がある。

> クラスタ化係数

クラスタ化係数は索引の列データと表の列データの分布度(データの格納順がどれくらい異なるかの指標)である。
インデックスの列データに格納されているデータ(キー値)とテーブルの列データに格納されているデータ(キー値)の順番がどれくらい揃っているか、バラツキがあるかを表す。
データの格納順がだいたい揃っている(比較的一致している)場合、クラスタ化係数は小さくなる
データの格納順がほとんど揃っていない(バラツキがある)場合、クラスタ化係数は大きくなる
係数の値によってデータアクセスのオペレーションが変わってくる(係数が小さい場合、TABLE ACCESS BY INDEX ROWID が採用されやすくなりますが、係数が大きい場合、索引スキャンより全表スキャンの方が効率が良いと判断される可能性がある)

chatgpt に聞いてみた

```
Me
索引クラスタ化係数を、若手ソフトウェアエンジニアでも分かるように説明して。

ChatGPT
索引クラスタ化係数は、データベースの中で、似たような情報が一緒に集まっているかどうかを示す数字です。想像してみてください、図書館の本棚の中に同じトピックの本が一緒にならんでいるようなイメージです。この係数が高いときは、たくさんの本がバラバラになっている感じで、探すのが少しめんどくさいんです。一方で、係数が低いと、同じトピックの本がひとかたまりでそろっているから、探しやすくなります。ソフトウェアを効率的に動かすためには、この係数を小さく保つことが大切なんですよ。
```

----

**idカラムにauto incrementを採用することの是非**

・メリット
- ユーザー目線ではurlのパスパラメータが予想しやすくページ遷移がしやすい
- uuidよりもクエリパフォーマンスの期待ができる

デメリット
- スクレイピングされやすい
- 攻撃されやすい
- リソース数が特定されやすい
- エンティティのidをnullableにしないといけない

参考
[idをautoincrementして何が悪いの？](https://zenn.dev/praha/articles/3c84e3818891c3)
[DDD Q&A](https://github.com/little-hands/ddd-q-and-a/issues/60)

### 課題 2

```sql
mysql> describe employees;
+------------+---------------+------+-----+---------+-------+
| Field      | Type          | Null | Key | Default | Extra |
+------------+---------------+------+-----+---------+-------+
| emp_no     | int(11)       | NO   | PRI | NULL    |       |
| birth_date | date          | NO   |     | NULL    |       |
| first_name | varchar(14)   | NO   |     | NULL    |       |
| last_name  | varchar(16)   | NO   |     | NULL    |       |
| gender     | enum('M','F') | NO   |     | NULL    |       |
| hire_date  | date          | NO   |     | NULL    |       |
+------------+---------------+------+-----+---------+-------+
6 rows in set (0.01 sec)
```

```sql
----最初
SELECT * FROM employees WHERE last_name like "b%";


| 499996 | 1953-03-07 | Zito           | Baaz          | M      | 1990-09-27 |
| 499998 | 1956-09-05 | Patricia       | Breugel       | M      | 1993-10-13 |
+--------+------------+----------------+---------------+--------+------------+
28794 rows in set (0.19 sec)
```

`last_name`にインデックスを付与してみる。

```sql

mysql> CREATE INDEX idx_last_name ON employees(last_name);
Query OK, 0 rows affected (1.02 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> SHOW INDEX FROM employees
       ;
+-----------+------------+---------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| Table     | Non_unique | Key_name      | Seq_in_index | Column_name | Collation | Cardinality | Sub_part | Packed | Null | Index_type | Comment | Index_comment |
+-----------+------------+---------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
| employees |          0 | PRIMARY       |            1 | emp_no      | A         |      299423 |     NULL | NULL   |      | BTREE      |         |               |
| employees |          1 | idx_last_name |            1 | last_name   | A         |        1618 |     NULL | NULL   |      | BTREE      |         |               |
+-----------+------------+---------------+--------------+-------------+-----------+-------------+----------+--------+------+------------+---------+---------------+
2 rows in set (0.00 sec)
```

インデックスを貼った状態でもう一回クエリを実行してみる。

```sql
SELECT * FROM employees WHERE last_name like "b%";


| 499996 | 1953-03-07 | Zito           | Baaz          | M      | 1990-09-27 |
| 499998 | 1956-09-05 | Patricia       | Breugel       | M      | 1993-10-13 |
+--------+------------+----------------+---------------+--------+------------+
28794 rows in set (0.07 sec)
```

→ 少し速くなった

ボリュームを削除して 5 回同じクエリを実行（last_name の index が剥がれる）

| 回数 | 秒数 |
| ---- | ---- |
| 1    | 0.17 |
| 2    | 0.09 |
| 3    | 0.08 |
| 4    | 0.09 |
| 5    | 0.09 |

1 回目と 2 回目で秒数に大きな違いがある。要因としては、

クエリの実行結果やデータ自体をキャッシュし、同じクエリの再実行時にキャッシュから取得した可能性がある。
初回のクエリ実行時にはデータを読み込むために時間がかかるが、2 回目以降はキャッシュからデータを取得するため、実行時間が短くなったと考えられる。

[メモ：キャッシュ](./cache.md)

実行計画を見てみる。

```sql
mysql> EXPLAIN SELECT * FROM employees WHERE last_name like "b%";
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
| id | select_type | table     | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra       |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
|  1 | SIMPLE      | employees | NULL       | ALL  | NULL          | NULL | NULL    | NULL |   31 |    11.11 | Using where |
+----+-------------+-----------+------------+------+---------------+------+---------+------+------+----------+-------------+
1 row in set, 1 warning (0.00 sec)
```

以下のことがわかった。

- 実行計画の type が ALL となっている。これは、全ての行をスキャンしていることを示す。
- possible_keys と key が NULL であり、このクエリはインデックスを使用していないことがわかる。（インデックス貼ってないから当然）

キャッシュを見てみる。

```sql
mysql> SHOW STATUS LIKE 'Qcache%';
+-------------------------+---------+
| Variable_name           | Value   |
+-------------------------+---------+
| Qcache_free_blocks      | 1       |
| Qcache_free_memory      | 1031832 |
| Qcache_hits             | 0       |
| Qcache_inserts          | 0       |
| Qcache_lowmem_prunes    | 0       |
| Qcache_not_cached       | 38      |
| Qcache_queries_in_cache | 0       |
| Qcache_total_blocks     | 1       |
+-------------------------+---------+
8 rows in set (0.00 sec)
```

したがって、以下が考えられる。

- データがメモリ内に存在していた可能性: データベースはキャッシュを使わず、データがメモリ内に残っていたため、2 回目のクエリが高速に実行された。
- データベースの最適化: データベースがクエリの実行において最適化され、2 回目の実行がより効率的に行われた。

### 課題3

元の実行結果
```sql
SELECT
t.title,
AVG(s.salary) AS average_salary,
AVG(s.salary) - (SELECT AVG(salary) FROM salaries) AS salary_difference
FROM titles AS t 
JOIN employees AS e USING(emp_no)
JOIN salaries AS s USING(emp_no)
WHERE t.title NOT LIKE '%Engineer%'
GROUP BY t.title;

+------------------+----------------+-------------------+
| title            | average_salary | salary_difference |
+------------------+----------------+-------------------+
| Manager          |     66924.2706 |         3113.5258 |
| Senior Staff     |     70470.8353 |         6660.0905 |
| Staff            |     69309.1023 |         5498.3574 |
| Technique Leader |     59294.3742 |        -4516.3707 |
+------------------+----------------+-------------------+
4 rows in set (46.58 sec)
```

インデックスを貼ってみる（各テーブルのemp_noやtitles.titleは元々indexが貼られていた）

```sql
mysql> CREATE INDEX idx_salary ON salaries (salary);
Query OK, 0 rows affected (7.91 sec)
Records: 0  Duplicates: 0  Warnings: 0

```

再実行してみる。

```sql


mysql> SELECT
       t.title,
       AVG(s.salary) AS average_salary,
       AVG(s.salary) - (SELECT AVG(salary) FROM salaries) AS salary_difference
       FROM titles AS t 
       JOIN employees AS e USING(emp_no)
       JOIN salaries AS s USING(emp_no)
       WHERE t.title NOT LIKE '%Engineer%'
       GROUP BY t.title;
+------------------+----------------+-------------------+
| title            | average_salary | salary_difference |
+------------------+----------------+-------------------+
| Manager          |     66924.2706 |         3113.5258 |
| Senior Staff     |     70470.8353 |         6660.0905 |
| Staff            |     69309.1023 |         5498.3574 |
| Technique Leader |     59294.3742 |        -4516.3707 |
+------------------+----------------+-------------------+
4 rows in set (15.82 sec)
```

劇的に速くなった。


実行計画

```sql
mysql> explain SELECT t.title, AVG(s.salary) AS average_salary, AVG(s.salary) - (SELECT AVG(salary) FROM salaries) AS salary_difference FROM titles AS t JOIN employees AS e USING(emp_no) JOIN salaries AS s USING(emp_no) WHERE t.title NOT LIKE '%Engineer%' GROUP BY t.title;
+----+-------------+----------+------------+--------+---------------+------------+---------+--------------------+------+----------+----------------------------------------------+
| id | select_type | table    | partitions | type   | possible_keys | key        | key_len | ref                | rows | filtered | Extra                                        |
+----+-------------+----------+------------+--------+---------------+------------+---------+--------------------+------+----------+----------------------------------------------+
|  1 | PRIMARY     | s        | NULL       | index  | PRIMARY       | idx_salary | 4       | NULL               |    1 |   100.00 | Using index; Using temporary; Using filesort |
|  1 | PRIMARY     | e        | NULL       | eq_ref | PRIMARY       | PRIMARY    | 4       | employees.s.emp_no |    1 |   100.00 | Using index                                  |
|  1 | PRIMARY     | t        | NULL       | ref    | PRIMARY       | PRIMARY    | 4       | employees.s.emp_no |    1 |    88.89 | Using where; Using index                     |
|  2 | SUBQUERY    | salaries | NULL       | index  | NULL          | idx_salary | 4       | NULL               |    1 |   100.00 | Using index                                  |
+----+-------------+----------+------------+--------+---------------+------------+---------+--------------------+------+----------+----------------------------------------------+
4 rows in set, 1 warning (0.00 sec)
```

indexをdropしてみる。

```sql
mysql> drop index idx_salary on salaries;
Query OK, 0 rows affected (0.05 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> explain SELECT t.title, AVG(s.salary) AS average_salary, AVG(s.salary) - (SELECT AVG(salary) FROM salaries) AS salary_difference FROM titles AS t JOIN employees AS e USING(emp_no) JOIN salaries AS s USING(emp_no) WHERE t.title NOT LIKE '%Engineer%' GROUP BY t.title;
+----+-------------+----------+------------+--------+---------------+---------+---------+--------------------+------+----------+---------------------------------+
| id | select_type | table    | partitions | type   | possible_keys | key     | key_len | ref                | rows | filtered | Extra                           |
+----+-------------+----------+------------+--------+---------------+---------+---------+--------------------+------+----------+---------------------------------+
|  1 | PRIMARY     | s        | NULL       | ALL    | PRIMARY       | NULL    | NULL    | NULL               |    1 |   100.00 | Using temporary; Using filesort |
|  1 | PRIMARY     | e        | NULL       | eq_ref | PRIMARY       | PRIMARY | 4       | employees.s.emp_no |    1 |   100.00 | Using index                     |
|  1 | PRIMARY     | t        | NULL       | ref    | PRIMARY       | PRIMARY | 4       | employees.s.emp_no |    1 |    88.89 | Using where; Using index        |
|  2 | SUBQUERY    | salaries | NULL       | ALL    | NULL          | NULL    | NULL    | NULL               |    1 |   100.00 | NULL                            |
+----+-------------+----------+------------+--------+---------------+---------+---------+--------------------+------+----------+---------------------------------+
4 rows in set, 1 warning (0.00 sec)
```


### 課題4

複合インデックスは、ソートされたリストにインデックスのデータを保存する他のインデックスと同じく、Bツリーインデックスである。

データベースは、インデックスのエントリをソートするのに、インデックスの定義に書かれた順序に従って列を識別します。最初の列は並べ替えの優先順位が最も 高く、最初の列に同じ値が複数ある時に限り、2番目の列でも並べ替えがされます。例えば、

```sql
CREATE UNIQUE INDEX employees_pk ON employees (employee_id, subsidiary_id)
```
このCREATE INDEX文を見ると、employee_idがsubsidiary_idよりも優先順位が高くなっていることがわかる。

![複合インデックス](https://use-the-index-luke.com/static/fig02_01_concatenated_index.ja.Kc5gBEdc.png)

優先順位の低い子会社IDは、同一の従業員ID内でのみソートが行われる。したがって、同一の子会社IDのノードは離散していることが多い。（上の例では、subsidiary_id=20など）


複合インデックスを用いる際には、どのカラムの優先順位を高く設定するのかが肝要である。

※2列ではなく、3列でインデックスを貼った場合、
- 1番目の列だけで検索する場合
- 1番目と2番目の列で検索する場合
- 全ての列で検索する場合

に、そのインデックスを活かすことができる。

----


```sql
CREATE INDEX employees_name ON employees (first_name, last_name)
```
上記のCREATE INDEX文だと、`first_name`で最初に並べ替えられ、その次に`last_name`で並べ替えるようにするクエリである。
以下のようなイメージである。

|  first_name	| last_name 	|
|---	|---	|
|  タロウ	| アイカワ 	| 
|  タロウ	| カトウ 	| 
|  タロウ	|  ヤマダ	| 
|  テツロウ	|  イトウ	| 
|  テツロウ	|  カトウ	| 
|  テツロウ	| ナカガワ	| 
|  ハナコ	| カトウ	| 
|  ハナコ	| カワイ	| 


上記の通り、last_nameのエントリはまとまっていない。
姓だけの検索が多い場合、以下のように最初に`last_name`で並び替えられるようにしないといけない。

```sql
CREATE INDEX employees_name ON employees (last_name, first_name)
```

なぜならば、同じ姓のエントリがまとまっている方が、インデックスによる検索速度の高速化が期待できるからである。
姓だけで検索する場合、下の名前を気にする必要はない。

After

|  last_name	| first_name 	|
|---	|---	|
|  アイカワ	| タロウ 	| 
|  イトウ	| テツロウ 	| 
|  カトウ	|  タロウ	| 
|  カトウ	|  テツロウ	| 
|  カトウ	|  ハナコ	| 
|  カワイ	| ハナコ	| 
|  ナカガワ	| テツロウ	| 
|  ヤマダ	| タロウ	| 