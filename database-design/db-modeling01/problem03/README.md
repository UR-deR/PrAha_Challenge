## 課題 3

### Yamaguchi さんの追加仕様

<img width="248" alt="スクリーンショット 2022-08-20 10 18 58" src="https://user-images.githubusercontent.com/76472239/185723805-def822ef-87d7-4e0f-84fa-69740052f847.png">

`Customer` テーブルに新たなカラムとして`is_loyal`(boolean)を用意しました。
このフラグがあることによって、注文代金を計算するときに割引を行うべきかの判定ができると考えました。

### 私の追加仕様

<img width="253" alt="スクリーンショット 2022-08-20 10 19 44" src="https://user-images.githubusercontent.com/76472239/185723829-7b0a3c4d-f4a6-44f7-bb06-ef40254a8353.png">

`Dish`テーブルに`stock`カラム(int)を用意しました。  
`stock`がゼロの商品は注文できないようにすれば仕様を満たせると考えました。
