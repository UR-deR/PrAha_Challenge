## 課題１

- SELECT NULL = 0;

```sql
SELECT NULL = 0
=> NULL
```

- NULL = NULL (以下、SELECT 部分を省略)

```sql
SELECT NULL = NULL
=> NULL
```

- NULL <> NULL

```sql
SELECT NULL <> NULL
=> NULL
```

- NULL AND TRUE

```sql
SELECT NULL AND TRUE
=> NULL
```

- NULL AND FALSE

```sql
SELECT NULL AND FALSE
=> 0
```

- NULL OR TRUE

```sql
SELECT NULL OR TRUE
=> 1
```

- NULL IS NULL

```sql
SELECT NULL IS NULL
=> 1
```

- NULL IS NOT NULL

```sql
SELECT NULL IS NOT NULL
=> 0
```

## 課題 2

以下のように中間テーブルを作成する。

![Assignee](https://user-images.githubusercontent.com/76472239/207285659-b6beda85-7d4e-4a55-8802-3f326f990f63.png)

今回の課題に関して言えば、`assigned_to_id`が`NULL`である = 担当者が設定されていない、と考えるのは自然な思考だと思うので NULL を許容しても良いと思う。

特定のカラムの値が NULL か否かでレコードの意味が変わるような設計をしているのであれば、モデリングに改善の余地があるように思う。

## 課題３

### Boolean のカラムをデフォルトで false にする

false として insert されたのか、デフォルト値として false が入れられたのかが分からない。

### Int のカラムをデフォルトで 0 にする

0 として insert されたのか、デフォルト値として 0 が入れられたのかが分からない。

### Text のカラムをデフォルトで "" にする

"" として insert されたのか、デフォルト値として "" が入れられたのかが分からない。

## 　課題 4

以下の実行結果がどのようになるでしょうか？

```sql
SELECT NULL = true;

SELECT NULL = false;
```
