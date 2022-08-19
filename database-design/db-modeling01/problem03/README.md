## 課題 3

### Yamaguchi さんの追加仕様

<img width="387" alt="スクリーンショット 2022-08-18 23 11 46" src="https://user-images.githubusercontent.com/76472239/185416509-22f55b17-379a-460e-ad69-00e2fb8f08c2.png">

`Customer` テーブルに新たなカラムとして`is_loyal`(boolean)を用意しました。
このフラグがあることによって、注文代金を計算するときに割引を行うべきかの判定ができると考えました。

### 私の追加仕様

<img width="367" alt="スクリーンショット 2022-08-18 23 12 24" src="https://user-images.githubusercontent.com/76472239/185416654-63b16091-124e-4be0-b810-17c389826edc.png">

`Dish`テーブルに`stock`カラム(int)を用意しました。  
`stock`がゼロの商品は注文できないようにすれば仕様を満たせると考えました。
