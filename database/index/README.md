### 課題１

**インデックスの仕組み**

インデックスの各ノードは双方向連結リストであり、各ノードの中にインデックスが貼られたカラムの値が格納されている。

> 双方向連結リスト
>
> 各ノードが前後のノードの情報を持っているコレクション。

![fuga](https://use-the-index-luke.com/static/fig01_01_index_leaf_nodes.ja.NS5zx69O.png)

インデックスが作成されていない場合は、テーブルを頭から順番に調べていくため走査に多くの時間を要する。
インデックスを作成すると、以下の画像のようなバランス検索木（B ツリー）が作成される。

![hoge](https://poppingcarp.com/wp-content/uploads/2021/11/index-page_data-page.svg)

インデックスによる検索は以下のように行われる。

1. IndexPage の B ツリーを走査する
1. リーフノードチェーンをたどる
1. Data Page のテーブルからデータを読み取る（Data Page にアクセスしなくて済むことも）

したがって、

- Data Page との I/O を減らせる
- 欲しいデータへの走査の時間が短い
- Index Page の各ノードはデータ量が少ない

ため、インデックスによってクエリの高速化が期待できる。

**slow query logを調べる理由**

slow query logを調べることで、実行に時間がかかり、最適化の候補となるクエリを見つけることができる。例えば、mysqlslowdumpを使って、slow queryを解析すると、以下のような情報を得られる。

```sh
/# mysqldumpslow /var/lib/mysql/84d4fcc06879-slow.log

Reading mysql slow query log from /var/lib/mysql/84d4fcc06879-slow.log
Count: 2  Time=0.07s (0s)  Lock=0.00s (0s)  Rows=8248.0 (16496), root[root]@localhost
  select * from zipcode where prefecture = 'S'

Count: 1  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@localhost
  select * from zipcode where prefecture = 'S' limit N

Count: 1  Time=0.00s (0s)  Lock=0.00s (0s)  Rows=1.0 (1), root[root]@localhost
  select * from zipcode limit N
```

slow queryを調べずに闇雲にインデックスを貼りまくると、SELECT以外のDMLに悪影響を及ぼす。

**INSERT**

インデックスはデータの検索速度を向上させるが、それを保つためには新しいエントリを追加する際にもインデックスを更新する必要がある。したがって、インデックスがある場合、データベースは新しいエントリをテーブルに挿入する際にそれらのインデックスも更新する必要がある。
インデックスの数が増えると、挿入操作の実行コストも増加します。つまり、インデックスの数は挿入文の実行コストに乗数のような影響を及ぼします。
したがって、どのカラムにインデックスを貼るのかは吟味する必要がある。

![インデックスの数による挿入のパフォーマンス変化](https://use-the-index-luke.com/static/fig08_01_insert.ja.tj3OKCEx.png)


**UPDATE**

UPDATE文のパフォーマンスもINSERTと同様に、インデックスの数に依存する。
UPDATE文はINSERT文と違って、更新対象のカラムのインデックスのみの更新で良いため、INSERT文よりはパフォーマンス的に優位である。全カラム更新する場合はインデックス数の影響を受けるため、ORMを使っている場合は生成されたSQLを認識しておいた方が良い。

![インデックスと列数による更新のパフォーマンス変化](https://use-the-index-luke.com/static/fig08_03_update.ja.X-qI9-ju.png)

**DELETE**

DELETE文も上記2つと同様に、インデックス数が多いほどパフォーマンスは低減する。逆に、インデックスが全く設定されていないと、削除対象のレコードをフルスキャンで走査しないといけないため、見つけるまでに時間がかかる。適切なカラムにインデックスを貼るのが大事。

![インデックスの数による削除のパフォーマンス変化](https://use-the-index-luke.com/static/fig08_02_delete.ja.oeageTzM.png)

したがって、闇雲にインデックスを貼るのではなく、slow queryを活用してインデックスを貼るべきかラムを計測しながら吟味する必要がある。

**カーディナリティとは**

カーディナリティは、データベースにおいて特定のカラム（列）内に存在する異なる値の数を示す指標である。単純に言えば、あるカラム内のユニークな値の数を意味する。

たとえば、"性別"というカラムがある場合、そのカラムのカーディナリティは通常2になる（男性と女性の2つの異なる値が存在するため）。しかし、"都道府県"というカラムの場合、カーディナリティは47（日本の都道府県数）になる。

高いカーディナリティを持つカラムは、その値が多様であるため、インデックスを効果的に利用することができる。一方で、低いカーディナリティを持つカラムは、インデックスを使っても効率的な検索が難しい場合がある。