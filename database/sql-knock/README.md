### 課題１

> 96 年に 3 回以上注文した（Orders が 3 つ以上紐づいている）Customer の id と、注文回数

```sql
SELECT C.CustomerID, COUNT(*) AS OrderCount
FROM Customers as C
JOIN Orders AS O USING(CustomerID)
WHERE O.OrderDate BETWEEN '1996-01-01' and '1996-12-31'
GROUP BY C.CustomerID
HAVING COUNT(*) >= 3
ORDER BY COUNT(*) DESC, C.CustomerID DESC;
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
