### 課題 1

> スロークエリーログの有効化

```sql
SET GLOBAL slow_query_log = 'ON';
```

> 0.1 秒以上かかるクエリをスロークエリーログに記録

```sql
SET GLOBAL long_query_time = 0.1;
```

> 0.1 秒以上かかるクエリ

```sql
SELECT e.emp_no, e.first_name, e.last_name, s.salary
FROM employees e
INNER JOIN salaries s ON e.emp_no = s.emp_no
WHERE e.gender = 'F'
AND YEAR(e.birth_date) < 1970
AND s.salary > 100000
ORDER BY e.emp_no;
```

**slow query log**

```sh
root@138e4329d113:/# cat /var/lib/mysql/138e4329d113-slow.log
mysqld, Version: 5.7.24 (MySQL Community Server (GPL)). started with:
Tcp port: 3306  Unix socket: /var/run/mysqld/mysqld.sock
Time                 Id Command    Argument
# Time: 2023-11-23T08:48:56.383316Z
# User@Host: root[root] @ localhost []  Id:     4
# Query_time: 4.003882  Lock_time: 0.000000 Rows_sent: 1  Rows_examined: 0
use employees;
SET timestamp=1700729336;
SELECT SLEEP(4);
# Time: 2023-11-23T08:52:48.102199Z
# User@Host: root[root] @ localhost []  Id:     6
# Query_time: 1.410841  Lock_time: 0.000168 Rows_sent: 37379  Rows_examined: 3013501
SET timestamp=1700729568;
SELECT e.emp_no, e.first_name, e.last_name, s.salary
FROM employees e
INNER JOIN salaries s ON e.emp_no = s.emp_no
WHERE e.gender = 'F'
AND YEAR(e.birth_date) < 1970
AND s.salary > 100000
ORDER BY e.emp_no;
# Time: 2023-11-23T08:52:57.857476Z
# User@Host: root[root] @ localhost []  Id:     6
# Query_time: 0.657592  Lock_time: 0.000170 Rows_sent: 37379  Rows_examined: 3013501
SET timestamp=1700729577;
SELECT e.emp_no, e.first_name, e.last_name, s.salary
FROM employees e
INNER JOIN salaries s ON e.emp_no = s.emp_no
WHERE e.gender = 'F'
AND YEAR(e.birth_date) < 1970
AND s.salary > 100000
ORDER BY e.emp_no;
# Time: 2023-11-23T08:53:00.521617Z
# User@Host: root[root] @ localhost []  Id:     6
# Query_time: 0.595943  Lock_time: 0.000120 Rows_sent: 37379  Rows_examined: 3013501
SET timestamp=1700729580;
SELECT e.emp_no, e.first_name, e.last_name, s.salary
FROM employees e
INNER JOIN salaries s ON e.emp_no = s.emp_no
WHERE e.gender = 'F'
AND YEAR(e.birth_date) < 1970
AND s.salary > 100000
ORDER BY e.emp_no;
```

参考
[How to enable the slow query log in MySQL](https://www.a2hosting.com/kb/developer-corner/mysql/enabling-the-slow-query-log-in-mysql/#:~:text=To%20enable%20the%20slow%20query%20log%2C%20type%20the%20following%20command,than%2010%20seconds%20to%20run.)

### 課題２

**最も頻繁に発生しているスロークエリ**

→Count が 3 のクエリ

```sh
root@138e4329d113:/# mysqldumpslow -s c /var/lib/mysql/138e4329d113-slow.log

Reading mysql slow query log from /var/lib/mysql/138e4329d113-slow.log
Count: 3  Time=3.12s (9s)  Lock=0.00s (0s)  Rows=24.0 (72), root[root]@localhost
  SELECT dm.dept_no, dm.emp_no, e.first_name, e.last_name, SUM(s.salary) AS total_salary FROM employees.dept_manager dm JOIN employees.employees e ON dm.emp_no = e.emp_no JOIN employees.salaries s ON dm.emp_no = s.emp_no WHERE s.from_date <= dm.to_date AND s.to_date >= dm.from_date GROUP BY dm.dept_no, dm.emp_no, e.first_name, e.last_name

Count: 3  Time=0.89s (2s)  Lock=0.00s (0s)  Rows=37379.0 (112137), root[root]@localhost
  SELECT e.emp_no, e.first_name, e.last_name, s.salary
  FROM employees e
  INNER JOIN salaries s ON e.emp_no = s.emp_no
  WHERE e.gender = 'S'
  AND YEAR(e.birth_date) < N
  AND s.salary > N
  ORDER BY e.emp_no

Count: 2  Time=3.30s (6s)  Lock=0.00s (0s)  Rows=24.0 (48), root[root]@localhost
  SELECT dm.dept_no,
  dm.emp_no,
  e.first_name,
  e.last_name,
  SUM(s.salary) AS total_salary
  FROM employees.dept_manager dm
  JOIN employees.employees e ON dm.emp_no = e.emp_no
  JOIN employees.salaries s ON dm.emp_no = s.emp_no
  WHERE s.from_date <= dm.to_date
  AND s.to_date >= dm.from_date
  GROUP BY dm.dept_no, dm.emp_no, e.first_name, e.last_name

Count: 1  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=0.0 (0), 0users@0hosts
  mysqld, Version: N.N.N (MySQL Community Server (GPL)). started with:
  # Time: N-N-23T08:N:N.383316Z
  # User@Host: root[root] @ localhost []  Id:     N
  # Query_time: N.N  Lock_time: N.N Rows_sent: N  Rows_examined: N
  use employees;
  SET timestamp=N;
  SELECT SLEEP(N)

Count: 1  Time=0.42s (0s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@localhost
  select count(*) from salaries

Count: 1  Time=84.26s (84s)  Lock=0.00s (0s)  Rows=4.0 (4), root[root]@localhost
  SELECT t.title, AVG(s.salary) AS average_salary, AVG(s.salary) - (SELECT AVG(salary) FROM salaries) AS salary_difference FROM titles AS t JOIN employees AS e USING(emp_no) JOIN salaries AS s USING(emp_no) WHERE t.title NOT LIKE 'S' GROUP BY t.title

Count: 1  Time=19.86s (19s)  Lock=0.00s (0s)  Rows=6365.0 (6365), root[root]@localhost
  SELECT * FROM employees WHERE employees.emp_no IN ( SELECT emp_no FROM dept_emp WHERE dept_no IN ( SELECT dept_no FROM departments WHERE dept_name NOT Like 'S' ) AND emp_no IN ( SELECT emp_no FROM salaries WHERE salary > ( SELECT AVG(salary) * N.N FROM salaries ) ) AND emp_no IN ( SELECT emp_no FROM titles WHERE (title = "S" AND from_date > 'S') OR (title = "S" AND from_date > 'S') OR (title = "S" AND from_date > "S") ) )  order by emp_no desc

Count: 1  Time=5.61s (5s)  Lock=0.00s (0s)  Rows=24.0 (24), root[root]@localhost
  SELECT dm.dept_no,        dm.emp_no,        e.first_name,        e.last_name,        SUM(s.salary) AS total_salary FROM employees.dept_manager dm          JOIN employees.employees e ON dm.emp_no = e.emp_no          JOIN employees.salaries s ON dm.emp_no = s.emp_no WHERE s.from_date <= dm.to_date   AND s.to_date >= dm.from_date GROUP BY dm.dept_no, dm.emp_no, e.first_name, e.last_name
```

**実行時間が最も長いクエリ**

→84s かかっているクエリ

```sh
root@138e4329d113:/# mysqldumpslow -s t /var/lib/mysql/138e4329d113-slow.log

Reading mysql slow query log from /var/lib/mysql/138e4329d113-slow.log
Count: 1  Time=84.26s (84s)  Lock=0.00s (0s)  Rows=4.0 (4), root[root]@localhost
  SELECT t.title, AVG(s.salary) AS average_salary, AVG(s.salary) - (SELECT AVG(salary) FROM salaries) AS salary_difference FROM titles AS t JOIN employees AS e USING(emp_no) JOIN salaries AS s USING(emp_no) WHERE t.title NOT LIKE 'S' GROUP BY t.title

Count: 1  Time=19.86s (19s)  Lock=0.00s (0s)  Rows=6365.0 (6365), root[root]@localhost
  SELECT * FROM employees WHERE employees.emp_no IN ( SELECT emp_no FROM dept_emp WHERE dept_no IN ( SELECT dept_no FROM departments WHERE dept_name NOT Like 'S' ) AND emp_no IN ( SELECT emp_no FROM salaries WHERE salary > ( SELECT AVG(salary) * N.N FROM salaries ) ) AND emp_no IN ( SELECT emp_no FROM titles WHERE (title = "S" AND from_date > 'S') OR (title = "S" AND from_date > 'S') OR (title = "S" AND from_date > "S") ) )  order by emp_no desc

Count: 3  Time=3.12s (9s)  Lock=0.00s (0s)  Rows=24.0 (72), root[root]@localhost
  SELECT dm.dept_no, dm.emp_no, e.first_name, e.last_name, SUM(s.salary) AS total_salary FROM employees.dept_manager dm JOIN employees.employees e ON dm.emp_no = e.emp_no JOIN employees.salaries s ON dm.emp_no = s.emp_no WHERE s.from_date <= dm.to_date AND s.to_date >= dm.from_date GROUP BY dm.dept_no, dm.emp_no, e.first_name, e.last_name

Count: 2  Time=3.30s (6s)  Lock=0.00s (0s)  Rows=24.0 (48), root[root]@localhost
  SELECT dm.dept_no,
  dm.emp_no,
  e.first_name,
  e.last_name,
  SUM(s.salary) AS total_salary
  FROM employees.dept_manager dm
  JOIN employees.employees e ON dm.emp_no = e.emp_no
  JOIN employees.salaries s ON dm.emp_no = s.emp_no
  WHERE s.from_date <= dm.to_date
  AND s.to_date >= dm.from_date
  GROUP BY dm.dept_no, dm.emp_no, e.first_name, e.last_name

Count: 1  Time=5.61s (5s)  Lock=0.00s (0s)  Rows=24.0 (24), root[root]@localhost
  SELECT dm.dept_no,        dm.emp_no,        e.first_name,        e.last_name,        SUM(s.salary) AS total_salary FROM employees.dept_manager dm          JOIN employees.employees e ON dm.emp_no = e.emp_no          JOIN employees.salaries s ON dm.emp_no = s.emp_no WHERE s.from_date <= dm.to_date   AND s.to_date >= dm.from_date GROUP BY dm.dept_no, dm.emp_no, e.first_name, e.last_name

Count: 3  Time=0.89s (2s)  Lock=0.00s (0s)  Rows=37379.0 (112137), root[root]@localhost
  SELECT e.emp_no, e.first_name, e.last_name, s.salary
  FROM employees e
  INNER JOIN salaries s ON e.emp_no = s.emp_no
  WHERE e.gender = 'S'
  AND YEAR(e.birth_date) < N
  AND s.salary > N
  ORDER BY e.emp_no

Count: 1  Time=0.42s (0s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@localhost
  select count(*) from salaries

Count: 1  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=0.0 (0), 0users@0hosts
  mysqld, Version: N.N.N (MySQL Community Server (GPL)). started with:
  # Time: N-N-23T08:N:N.383316Z
  # User@Host: root[root] @ localhost []  Id:     N
  # Query_time: N.N  Lock_time: N.N Rows_sent: N  Rows_examined: N
  use employees;
  SET timestamp=N;
  SELECT SLEEP(N)

```

**ロック時間が最も長いクエリ**

→ 全部ロック時間が 0 秒

```sh
root@138e4329d113:/# mysqldumpslow -s l /var/lib/mysql/138e4329d113-slow.log

Reading mysql slow query log from /var/lib/mysql/138e4329d113-slow.log
Count: 1  Time=84.26s (84s)  Lock=0.00s (0s)  Rows=4.0 (4), root[root]@localhost
  SELECT t.title, AVG(s.salary) AS average_salary, AVG(s.salary) - (SELECT AVG(salary) FROM salaries) AS salary_difference FROM titles AS t JOIN employees AS e USING(emp_no) JOIN salaries AS s USING(emp_no) WHERE t.title NOT LIKE 'S' GROUP BY t.title

Count: 1  Time=19.86s (19s)  Lock=0.00s (0s)  Rows=6365.0 (6365), root[root]@localhost
  SELECT * FROM employees WHERE employees.emp_no IN ( SELECT emp_no FROM dept_emp WHERE dept_no IN ( SELECT dept_no FROM departments WHERE dept_name NOT Like 'S' ) AND emp_no IN ( SELECT emp_no FROM salaries WHERE salary > ( SELECT AVG(salary) * N.N FROM salaries ) ) AND emp_no IN ( SELECT emp_no FROM titles WHERE (title = "S" AND from_date > 'S') OR (title = "S" AND from_date > 'S') OR (title = "S" AND from_date > "S") ) )  order by emp_no desc

Count: 3  Time=3.12s (9s)  Lock=0.00s (0s)  Rows=24.0 (72), root[root]@localhost
  SELECT dm.dept_no, dm.emp_no, e.first_name, e.last_name, SUM(s.salary) AS total_salary FROM employees.dept_manager dm JOIN employees.employees e ON dm.emp_no = e.emp_no JOIN employees.salaries s ON dm.emp_no = s.emp_no WHERE s.from_date <= dm.to_date AND s.to_date >= dm.from_date GROUP BY dm.dept_no, dm.emp_no, e.first_name, e.last_name

Count: 3  Time=0.89s (2s)  Lock=0.00s (0s)  Rows=37379.0 (112137), root[root]@localhost
  SELECT e.emp_no, e.first_name, e.last_name, s.salary
  FROM employees e
  INNER JOIN salaries s ON e.emp_no = s.emp_no
  WHERE e.gender = 'S'
  AND YEAR(e.birth_date) < N
  AND s.salary > N
  ORDER BY e.emp_no

Count: 2  Time=3.30s (6s)  Lock=0.00s (0s)  Rows=24.0 (48), root[root]@localhost
  SELECT dm.dept_no,
  dm.emp_no,
  e.first_name,
  e.last_name,
  SUM(s.salary) AS total_salary
  FROM employees.dept_manager dm
  JOIN employees.employees e ON dm.emp_no = e.emp_no
  JOIN employees.salaries s ON dm.emp_no = s.emp_no
  WHERE s.from_date <= dm.to_date
  AND s.to_date >= dm.from_date
  GROUP BY dm.dept_no, dm.emp_no, e.first_name, e.last_name

Count: 1  Time=5.61s (5s)  Lock=0.00s (0s)  Rows=24.0 (24), root[root]@localhost
  SELECT dm.dept_no,        dm.emp_no,        e.first_name,        e.last_name,        SUM(s.salary) AS total_salary FROM employees.dept_manager dm          JOIN employees.employees e ON dm.emp_no = e.emp_no          JOIN employees.salaries s ON dm.emp_no = s.emp_no WHERE s.from_date <= dm.to_date   AND s.to_date >= dm.from_date GROUP BY dm.dept_no, dm.emp_no, e.first_name, e.last_name

Count: 1  Time=0.42s (0s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@localhost
  select count(*) from salaries

Count: 1  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=0.0 (0), 0users@0hosts
  mysqld, Version: N.N.N (MySQL Community Server (GPL)). started with:
  # Time: N-N-23T08:N:N.383316Z
  # User@Host: root[root] @ localhost []  Id:     N
  # Query_time: N.N  Lock_time: N.N Rows_sent: N  Rows_examined: N
  use employees;
  SET timestamp=N;
  SELECT SLEEP(N)
```

参考: [4.6.10 mysqldumpslow — Summarize Slow Query Log Files](https://dev.mysql.com/doc/refman/8.0/en/mysqldumpslow.html)

### 課題 3

```sql

mysql>
SELECT dm.dept_no, dm.emp_no, e.first_name, e.last_name, SUM(s.salary) AS total_salary
FROM employees.dept_manager dm
JOIN employees.employees e ON dm.emp_no = e.emp_no
JOIN employees.salaries s ON dm.emp_no = s.emp_no
WHERE s.from_date <= dm.to_date AND s.to_date >= dm.from_date
GROUP BY dm.dept_no, dm.emp_no, e.first_name, e.last_name;

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
24 rows in set (2.93 sec)

mysql> mysql> EXPLAIN SELECT dm.dept_no, dm.emp_no, e.first_name, e.last_name, SUM(s.salary) AS total_salary
    -> FROM employees.dept_manager dm
    -> JOIN employees.employees e ON dm.emp_no = e.emp_no
    -> JOIN employees.salaries s ON dm.emp_no = s.emp_no
    -> WHERE s.from_date <= dm.to_date AND s.to_date >= dm.from_date
    -> GROUP BY dm.dept_no, dm.emp_no, e.first_name, e.last_name\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: s
   partitions: NULL
         type: ALL
possible_keys: PRIMARY
          key: NULL
      key_len: NULL
          ref: NULL
         rows: 1
     filtered: 100.00
        Extra: Using temporary; Using filesort
*************************** 2. row ***************************
           id: 1
  select_type: SIMPLE
        table: dm
   partitions: NULL
         type: ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 4
          ref: employees.s.emp_no
         rows: 1
     filtered: 11.11
        Extra: Using where
*************************** 3. row ***************************
           id: 1
  select_type: SIMPLE
        table: e
   partitions: NULL
         type: eq_ref
possible_keys: PRIMARY
          key: PRIMARY
      key_len: 4
          ref: employees.s.emp_no
         rows: 1
     filtered: 100.00
        Extra: NULL
3 rows in set, 1 warning (0.00 sec)

```

salaries テーブルにおいて、`Using temporary; Using filesort`が発生している。一旦対応は見送り。index で解決する問題ではないため。`tmp_table_size`と`max_heap_table_size`の値を増やせば解消できそう。
