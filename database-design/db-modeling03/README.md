回答

![document_management (1)](https://user-images.githubusercontent.com/76472239/188297594-cc76b38d-e07f-4ecd-8b1a-8121938e07cc.png)

## 課題 1 と 2

### ディレクトリ構造の一例

- dir_a

  - dir_b

    - hoge
    - baz

  - dir_c
    - dir_d
      - bar
  - dir_e

- foo

### directory_tree テーブルのレコード例

| parent_id | child_id |
| --------- | -------- |
| dir_a_id  | dir_a_id |
| dir_a_id  | dir_b_id |
| dir_a_id  | hoge_id  |
| dir_a_id  | dir_c_id |
| dir_a_id  | dir_d_id |
| dir_a_id  | bar_id   |
| dir_a_id  | dir_e_id |
| dir_b_id  | dir_b_id |
| dir_b_id  | hoge_id  |
| hoge_id   | hoge_id  |
| dir_c_id  | dir_c_id |
| dir_c_id  | dir_d_id |
| dir_c_id  | bar_id   |
| dir_d_id  | dir_d_id |
| dir_d_id  | bar_id   |
| bar_id    | bar_id   |
| dir_e_id  | dir_e_id |
| foo_id    | foo_id   |

ドキュメント`bar`の階層構造を取得したい場合は以下のクエリを実行し、`parent_id` と `depth` を元に算出できる。

```sql
SELECT * FROM directory_tree where child_id='bar_id';
```

| parent_id | child_id | depth |
| --------- | -------- | ----- |
| dir_a_id  | bar_id   | 1     |
| dir_c_id  | bar_id   | 2     |
| dir_d_id  | bar_id   | 3     |
| bar_id    | bar_id   | 4     |

### directory のレコード例

timestamp は除く

| id       | name  |
| -------- | ----- |
| dir_a_id | dir_a |
| dir_b_id | dir_b |
| dir_c_id | dir_c |
| dir_d_id | dir_d |
| dir_e_id | dir_e |

### document のレコード例

timestamp は除く

| id      | name | order |
| ------- | ---- | ----- |
| hoge_id | hoge | 1     |
| foo_id  | foo  | 1     |
| bar_id  | bar  | 1     |
| baz_id  | baz  | 2     |

### CREATE の例

`dir_a/dir_b/hoge`と同階層に`piyo`を作成する場合、
`directory_tree`テーブルには以下のようにレコードを追加する。

- dir_a

  - dir_b

    - hoge
    - **piyo** ← new

| parent_id | child_id |
| --------- | -------- |
| dir_a_id  | piyo     |
| dir_b     | piyo     |
| piyo      | piyo     |

### DELETE の例

`directory_tree`テーブル の仕組み上、物理削除を行わざるを得ない。上記で CREATE した piyo を削除する場合は、以下レコードを削除する。

- dir_a

  - dir_b

    - hoge
    - ~~- piyo~~

| parent_id | child_id |
| --------- | -------- |
| dir_a_id  | piyo     |
| dir_b     | piyo     |
| piyo      | piyo     |

### いつ誰がどんな情報を〜

`document_history` テーブルを用いてを実現させる。履歴表示で `content` の差分を表示するような場合は、クライアント側のライブラリで対応する(文字列の差分の検出。

### 課題 2 表示順番の制御

`document`テーブルに order カラムを持たせて対応。
