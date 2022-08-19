## 課題 3

### Yamaguchi さんの追加仕様

<img width="252" alt="スクリーンショット 2022-08-19 23 47 12" src="https://user-images.githubusercontent.com/76472239/185645132-c19eaaeb-3744-440c-be56-715ffe16facf.png">



`Customer` テーブルに新たなカラムとして`is_loyal`(boolean)を用意しました。
このフラグがあることによって、注文代金を計算するときに割引を行うべきかの判定ができると考えました。

### 私の追加仕様
<img width="253" alt="スクリーンショット 2022-08-19 23 51 13" src="https://user-images.githubusercontent.com/76472239/185645956-baf1eac3-72d8-4525-ae84-f3ffdef19707.png">




`Dish`テーブルに`dish_count`カラム(int)を用意しました。  
`dish_count`がゼロの商品は注文できないようにすれば仕様を満たせると考えました。
