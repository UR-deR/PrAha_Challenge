### 課題１

> ビューの仕組み、用途とメリット

ビューは SQL 文の結果セットに基づく仮想テーブルである。
ビューには、実際のテーブルと同じように行と列がある。ビューのフィールドは、データベース内の 1 つ以上の実際のテーブルのフィールドである。
ビューは[CREATE VIEW](https://dev.mysql.com/doc/refman/8.0/ja/create-view.html)文によって作成される、

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

アプリケーションプログラムは、テーブルのすべてのカラムの情報が必要であるとは限らないケースがある。あるいは、外に見せたくないカラムの情報がテーブルに格納されていたりする。
ビューを定義することによって、アプリケーションで利用される想定のカラムだけをアプリケーションに提供することができる。

また、アプリケーション側で複雑な内部結合などをしなくても良いように、内部結合をした結果のデータセットをビューとして定義することができる。こうすることで、アプリケーション側の SQL クエリの可読性の向上が期待できる。

![ビュー](data:image/png;base64,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)

実表のデータが更新（挿入、変更、削除）されると、対応するビューの表のデータに反映される。

**メリット**

- 許可されたユーザのみがビューにアクセスできるようにすることで、 セキュリティの方法として使用することができる。データベース管理者は、ビュー内のテーブルを編集、削除、表示することができる。

- SELECT 文の複雑さを隠すことができる。

- ビューは仮想なので、ストレージを占有しない。

> Materialized View

1. **定義と構造:**

   - **ビュー（View）:** ビューは、クエリに基づいて生成される仮想的なテーブル。ビューはクエリを含んでおり、実際のデータは格納していない。データの実態は元のテーブルや他のビューに存在する。
   - **マテリアライズドビュー（Materialized View）:** マテリアライズドビューは、ビューとは異なり、物理的なデータを持つオブジェクトである。これは実際のデータを保持し、定期的に更新されることがある。

2. **パフォーマンス:**

   - **ビュー:** ビューはクエリを実行するたびにその時点でデータを生成する。これはリアルタイムのデータを反映するが、クエリの実行時にリソースを必要とする。
   - **マテリアライズドビュー:** マテリアライズドビューはデータを物理的に保持しているため、クエリ実行時にはビューのように毎回データを生成する必要はない。ただし、定期的な更新が必要であるため、データが最新でない場合がある。

3. **ストレージとリフレッシュ:**

   - **ビュー:** ビューは実際のデータを保持していないため、ストレージの使用は少ない。データはクエリの実行時に生成される。
   - **マテリアライズドビュー:** マテリアライズドビューはデータを保持するため、通常はストレージスペースを消費する。また、定期的に更新（リフレッシュ）する必要がある

4. **使い分け:**
   - **ビュー:** 頻繁に変わるデータやリアルタイムのデータが必要な場合に有用
   - **マテリアライズドビュー:** 頻繁にアクセスされる複雑なクエリや集計など、処理に時間のかかる操作を最適化するのに役立つ。

参考：[Difference between View and Materialized View](https://www.scaler.com/topics/difference-between-view-and-materialized-view/)

### 課題 2

**マネージャーの在籍期間の報酬の合計**

```sql
SELECT dm.dept_no,
       dm.emp_no,
       e.first_name,
       e.last_name,
       SUM(s.salary) AS total_salary
FROM dept_manager dm
JOIN employees e ON dm.emp_no = e.emp_no
JOIN salaries s ON dm.emp_no = s.emp_no
WHERE s.from_date <= dm.to_date AND dm.from_date <= s.to_date
GROUP BY dm.dept_no, dm.emp_no;
```

VIEW を作成

```sql
CREATE VIEW dept_manager_total_salary
AS
SELECT dm.dept_no, dm.emp_no, e.first_name, e.last_name, SUM(s.salary) AS total_salary
FROM dept_manager dm
JOIN employees e ON dm.emp_no = e.emp_no
JOIN salaries s ON dm.emp_no = s.emp_no
WHERE s.from_date <= dm.to_date AND dm.from_date <= s.to_date
GROUP BY dm.dept_no, dm.emp_no;
```

VIEW に対してクエリを投げてみる。

```sql
mysql> select * from dept_manager_total_salary;
+---------+--------+-------------+--------------+--------------+
| dept_no | emp_no | first_name  | last_name    | total_salary |
+---------+--------+-------------+--------------+--------------+
| d001    | 110022 | Margareta   | Markovitch   |       535265 |
| d001    | 110039 | Vishwani    | Minakawa     |      1120103 |
| d002    | 110085 | Ebru        | Alpin        |       313717 |
| d002    | 110114 | Isamu       | Legleitner   |      1016628 |
| d003    | 110183 | Shirish     | Ossenbruggen |       434294 |
| d003    | 110228 | Karsten     | Sigstam      |       690217 |
| d004    | 110303 | Krassimir   | Wegerle      |       172223 |
| d004    | 110344 | Rosine      | Cools        |       291131 |
| d004    | 110386 | Shem        | Kieras       |       256246 |
| d004    | 110420 | Oscar       | Ghazalie     |       349492 |
| d005    | 110511 | DeForest    | Hagimont     |       422015 |
| d005    | 110567 | Leon        | DasSarma     |       678391 |
| d006    | 110725 | Peternela   | Onuegbe      |       339242 |
| d006    | 110765 | Rutger      | Hofmeyr      |       125470 |
| d006    | 110800 | Sanjoy      | Quadeer      |       202746 |
| d006    | 110854 | Dung        | Pesch        |       586006 |
| d007    | 111035 | Przemyslawa | Kaelbling    |       533289 |
| d007    | 111133 | Hauke       | Zhang        |      1102560 |
| d008    | 111400 | Arie        | Staelin      |       545504 |
| d008    | 111534 | Hilary      | Kambil       |       836471 |
| d009    | 111692 | Tonny       | Butterworth  |       175348 |
| d009    | 111784 | Marjo       | Giarratana   |       221609 |
| d009    | 111877 | Xiaobin     | Spinelli     |       231613 |
| d009    | 111939 | Yuchang     | Weedman      |       436188 |
+---------+--------+-------------+--------------+--------------+
24 rows in set (2.40 sec)
```

（参考）VIEW 作成前: `24 rows in set (2.50 sec)`  
→ パフォーマンス面における変化は無いと考えられる。

---

**実行計画**

ビューの仮装テーブルを参照するようになるため、実行計画に変化が生じる。

```sql
mysql> explain SELECT dm.dept_no, dm.emp_no, e.first_name, e.last_name, SUM(s.salary) AS total_salary
    -> FROM dept_manager dm
    -> JOIN employees e ON dm.emp_no = e.emp_no
    -> JOIN salaries s ON dm.emp_no = s.emp_no
    -> WHERE s.from_date <= dm.to_date AND dm.from_date <= s.to_date
    -> GROUP BY dm.dept_no, dm.emp_no;
+----+-------------+-------+------------+--------+---------------+---------+---------+--------------------+------+----------+---------------------------------+
| id | select_type | table | partitions | type   | possible_keys | key     | key_len | ref                | rows | filtered | Extra                           |
+----+-------------+-------+------------+--------+---------------+---------+---------+--------------------+------+----------+---------------------------------+
|  1 | SIMPLE      | s     | NULL       | ALL    | PRIMARY       | NULL    | NULL    | NULL               |    1 |   100.00 | Using temporary; Using filesort |
|  1 | SIMPLE      | dm    | NULL       | ref    | emp_no        | emp_no  | 4       | employees.s.emp_no |    1 |    11.11 | Using where                     |
|  1 | SIMPLE      | e     | NULL       | eq_ref | PRIMARY       | PRIMARY | 4       | employees.s.emp_no |    1 |   100.00 | NULL                            |
+----+-------------+-------+------------+--------+---------------+---------+---------+--------------------+------+----------+---------------------------------+
3 rows in set, 1 warning (0.00 sec)

mysql> explain select * from dept_manager_total_salary;
+----+-------------+------------+------------+--------+---------------+---------+---------+--------------------+------+----------+---------------------------------+
| id | select_type | table      | partitions | type   | possible_keys | key     | key_len | ref                | rows | filtered | Extra                           |
+----+-------------+------------+------------+--------+---------------+---------+---------+--------------------+------+----------+---------------------------------+
|  1 | PRIMARY     | <derived2> | NULL       | ALL    | NULL          | NULL    | NULL    | NULL               |    2 |   100.00 | NULL                            |
|  2 | DERIVED     | s          | NULL       | ALL    | PRIMARY       | NULL    | NULL    | NULL               |    1 |   100.00 | Using temporary; Using filesort |
|  2 | DERIVED     | dm         | NULL       | ref    | emp_no        | emp_no  | 4       | employees.s.emp_no |    1 |    11.11 | Using where                     |
|  2 | DERIVED     | e          | NULL       | eq_ref | PRIMARY       | PRIMARY | 4       | employees.s.emp_no |    1 |   100.00 | NULL                            |
+----+-------------+------------+------------+--------+---------------+---------+---------+--------------------+------+----------+---------------------------------+
4 rows in set, 1 warning (0.00 sec)
```
