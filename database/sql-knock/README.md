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
