## 解答

## 課題１

「どのような問題が生じるか」

- 要素の更新、削除の処理が複雑になる
- 文字列型の最大文字列数によって格納できる要素数にばらつきが生じる
- タグと関係のない文字列が混入する可能性がある
- インデックスが効かない（検索の時にパターンマッチを用いないといけないため）

**参考**

[sql アンチパターンと解決策-入門編-](https://qiita.com/rch1223/items/1150be193b1930ddd1dc#1%E7%AB%A0-%E4%BF%A1%E5%8F%B7%E7%84%A1%E8%A6%96%E3%82%B8%E3%82%A7%E3%82%A4%E3%82%A6%E3%82%A9%E3%83%BC%E3%82%AF)

[SQL：カンマ区切りのカラムはアカン](https://shiro-secret-base.com/?p=890)

[【DB 設計アンチパターン】カンマ区切りリストの項目を定義する](https://bbh.bz/2020/07/05/dont-define-camma-splitted-list-in-db/)

## 課題 2

![tags (1)](https://user-images.githubusercontent.com/76472239/190937254-b215b431-da0a-43da-9c88-bbf0e27ff3b1.png)

`Post`と`Tag`は互いに非依存な関係なので交差テーブルで関係性を表現する。そうすることによって、

- Posts テーブルの tag カラムに NULL が生まれない
- Posts に対しての Tags の更新、削除が容易
- 特定のタグを持つレコードの検索が容易(文字列検索・正規表現が不要)

などの恩恵が得られる。

## 課題 3

<img width="789" alt="スクリーンショット 2022-09-19 11 02 02" src="https://user-images.githubusercontent.com/76472239/190939221-a951ab5a-331e-4347-9fb3-cb93bdf7e271.png">


Github の Pull requests を考える。

添付画像の通り、それぞれの PR に対して Label を複数個つけたり、Label を一個もつけないこともできる。したがって、pull_requests と label は互いに非依存な関係なので、課題 2 と同様に交差テーブルを用いて関係性を表現するのが良いと思う。
