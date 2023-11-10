### 課題１

> 96 年に 3 回以上注文した（Orders が 3 つ以上紐づいている）Customer の id と、注文回数

```sql
SELECT CustomerID, count(*) as orderCount
FROM Orders
WHERE OrderDate BETWEEN '1996-01-01' and '1996-12-31'
GROUP BY CustomerID
HAVING orderCount >= 3
ORDER BY orderCount DESC, CustomerID DESC;
```

> 過去最も多くの OrderDetail が紐づいた Order

```sql
SELECT OrderID, COUNT(*) AS OrderDetailCount
FROM OrderDetails
GROUP BY OrderID
ORDER BY COUNT(*) DESC
LIMIT 1;
```

> 過去最も多くの Order が紐づいた Shipper

```sql
SELECT ShipperID, COUNT(*) AS ShippingCount
FROM Orders
GROUP BY ShipperID
ORDER BY COUNT(*) DESC;
```

> 売上が高い順番に Country を出す

```sql
SELECT ROUND(SUM(OrderDetails.Quantity * Products.Price)) AS sales, Country
FROM Orders
JOIN OrderDetails USING(OrderID)
JOIN Products USING(ProductID)
JOIN Customers USING(CustomerID)
GROUP BY Country
ORDER BY sales DESC;
```

> 国ごとの売上を年毎に（1 月 1 日~12 月 31 日の間隔で）集計

```sql
SELECT ROUND(SUM(OrderDetails.Quantity * Products.Price)) AS Sales, strftime('%Y', Orders.OrderDate) as OrderYear ,Country
FROM Orders
JOIN OrderDetails USING(OrderID)
JOIN Products USING(ProductID)
JOIN Customers USING(CustomerID)
GROUP BY Country, strftime('%Y', Orders.OrderDate)
ORDER BY Country, Orders.OrderDate;
```

> Employees テーブルへの Junior カラムの追加

```sql
ALTER TABLE Employees ADD Junior AS ('1960-12-31' < BirthDate);
```

> 「long_relation」カラム（boolean）を Shipper テーブルに追加

```sql
ALTER TABLE Shippers ADD long_relation BOOLEAN;

UPDATE Shippers
SET long_relation = CASE
  WHEN ShipperID IN (
    SELECT Orders.ShipperID
    FROM Orders
    GROUP BY Orders.ShipperID
    HAVING COUNT(*) >= 70
  )
  THEN TRUE
  ELSE FALSE
END;
```

> それぞれの Employee が最後に担当した Order と、その日付

```sql
SELECT EmployeeID, MAX(OrderDate) AS LatestOrderDate
FROM Orders
GROUP BY EmployeeID
HAVING MAX(OrderDate) = OrderDate;
```

> Customer テーブルの任意の１レコードの CustomerName を NULL にする

```sql
UPDATE Customers SET CustomerName = NULL WHERE CustomerID = 1;
```

> CustomerName が存在するユーザを取得するクエリ

```sql
SELECT * FROM Customers WHERE CustomerName IS NOT NULL;
```

> CustomerName が存在しないユーザを取得するクエリ

```sql
SELECT * FROM Customers WHERE CustomerName IS NULL;
```

> IS NULL が必要な理由

```sql
 = NULL
 > NULL
 < NULL
 <> NULL
NULL = NULL
```

上記の結果はいずれも`NULL`である。
NULL は値がないことを示す値であり、等価比較に用いることはできない。（c.f. 三値論理）

> EmployeeID=1 を削除

```sql
DELETE FROM Employees
WHERE EmployeeID = 1;
```

> EmloyeeId=1 が担当した Orders を表示しないクエリ

```sql
SELECT OrderID, EmployeeID
FROM Orders
JOIN Employees USING(EmployeeID);
```

> EmloyeeId=1 が担当した Orders を表示する（Employees に関する情報は NULL で埋まる）クエリ

```sql
SELECT Orders.OrderID, Orders.CustomerID, Employees.EmployeeID, Orders.OrderDate, Orders.ShipperID
FROM Orders
LEFT OUTER JOIN Employees USING(EmployeeID)
ORDER BY Employees.EmployeeID;
```

### 課題２

> where と having の違い

where は group by の前に実行されるため対象はテーブルである。

```sql
SELECT country FROM Customers WHERE Country LIKE 'S%';

```

having は group by 句の後に実行されるため、グルーピング化した集合に対して選択条件を指定することができる。例えば、

```sql
SELECT count(*), country FROM Customers GROUP BY Country HAVING Count(*) >= 5;
```

上記のクエリでは、Country ごとにグルーピングした後、グループに含まれる Country の数が 5 以上の国のみを抽出している。

したがって、グルーピング化したいか否かによって、使い分けが必要になる。

> DDL、DML、DCL、TCL

**DDL**
DDL(Data Definition Language)は、CREATE や DROP、ALTER などデータベースオブジェクトの生成や削除変更を行うコマンド

**DML**
DML(Data Manipulation Language)は SELECT/INSERT/UPDATE/DELETE などテーブルに対するデータの取得・追加・更新・削除を行うコマンド。

**DCL**
DCL(Data Control Language)は「DML や DDL の実行に関する許可や拒否を設定するための言語」であり、GRANT, REVOKE などがある。(REVOKE: テーブル、ビュー、などに対する権限を取り消す。)

**TCL**
TCL(Transaction Control Language)は、BEGIN、COMMIT、ROLLBACK などトランザクションの制御を行うためのコマンド。

### 課題 3

**問題 1**

次の各演算子の違いはなんでしょうか？

- exists
- any
- all

**問題 2**

以下のクエリは、「大阪のサプライヤーが供給している Product の売り上げ個数の総和」を求めるためのものです。
以下のクエリを WITH 句を用いてリファクタリングしてください。

```sql
SELECT SUM(OrderDetails.Quantity)
FROM OrderDetails
WHERE OrderDetails.ProductID IN
  (SELECT Products.ProductID
  FROM Products
  WHERE Products.SupplierID
  IN (SELECT Suppliers.SupplierID
      FROM Suppliers
      WHERE City = 'Osaka'
      )
   );
```

**問題 3**

サブクエリと比較した際の WITH 句の欠点はなんでしょうか？
