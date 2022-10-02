## 解答

## 課題1

### 親か子かを判別する責務がDBからアプリケーション側に委ねられることになる。

親メッセージのレコードの`parent_id`カラムの値がNULLになるため、親メッセージを取得する時には以下のようなWHERE句をアプリケーション側で書かなくてはいけない。
```sql
SELECT * FROM Message WHERE parent_id IS NULL;
```
同じDBに触れる他のアプリケーションでも毎回同じ条件句を書かなくてはならない。

###  SELECTがつらい
親メッセージとそれに付随する子メッセージを一括取得したい場合に以下のようなクエリを書かないといけない。
```sql
 SELECT
    m1.*,
    m2.*
FROM Message m1
LEFT JOIN Message m2 ON m2.parent_id=m1.id;
```
子が1件だけなら良いが、階層構造が無制限な場合、JOIN句が増えることが予想される。以下は一例。
```sql
 SELECT
    m1.*,
    m2.*,
    m3.*
FROM Message m1
LEFT JOIN Message m2 ON m2.parent_id=m1.id;
LEFT JOIN Message m3 ON m3.parent_id=m2.id;
```

### 外部キー制約があるため削除がつらい
外部キー制約のせいで、メッセージを削除する際には削除したいメッセージの子孫として紐付いているメッセージを全て削除する必要があり、しかも制約のせいで最下層から順に削除していかなければならない。

もし指定のメッセージだけを削除したい場合は、子メッセージのparent_idを別のメッセージのidにセットしてからでないと削除できない。

## 課題2



## 課題3