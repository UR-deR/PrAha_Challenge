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
