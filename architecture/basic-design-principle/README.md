# 基本的な設計原則

## 課題１

### SOLID 原則の各要素を守るメリット

---

### S (Single Responsibility) 単一責任の原則

あるクラスやモジュールが複数の責務を負っている場合、ある一つの責務に対して影響を与えたつもりにもかかわらず、他の責務の箇所にまで影響を及ぼしてしまい得る。

単一責任の原則を守ることで、変更を加えた際に他の無関係な箇所に影響が及ぼされなくなる。したがって、コードの変更容易性の向上にもつながる。

単一の責務しか持っていない方がコードの可読性の向上にもつながると思う。

### O (Open-Closed) オープンクローズドの原則

「ソフトウェアの構成要素は拡張に対して開いていて、修正に対して閉じていなければならない」という原則。(= ソフトウェアの振る舞いは、既存の成果物を変更せず拡張できるようにすべきである)

オープンクローズドの原則が守られていないと

- 修正のたびに既存の成果物に変更が加えられ、修正のたびに既存の成果物がカオスになっていく。条件分岐が増える

オープンクローズドの原則が守られていると

- 既存の interface を継承するだけで新たなクラスを生やすことができ、既存の成果物が複雑にならない

### L (Liskov Substitution) リスコフの置換原則

サブタイプのオブジェクトはスーパータイプのオブジェクトの仕様に従わなければならないという原則。

ある一つのサブタイプだけがスーパータイプのオブジェクトの仕様を満たしていない場合、そのサブタイプ専用の条件分岐を入れないといけなくなり、コードが複雑化する。

また、この原則を遵守しないとオープンクローズドの原則の違反にもつながってしまう。

### I (Interface Segregation) インターフェース分離の原則

インターフェイスとクライアント（インターフェイスの利用者）がいるときに、インターフェイスに用意されてある不必要なメソッドやプロパティ（利用するクライアントにとって不必要）にクライアントが依存しなくてもよいように、分割できるインターフェイスは分割するべきであるという原則。

クライアントが不必要なメソッドに依存しているということは、クライアントが知る必要がない情報を持ってしまっているということである。

e.g. インターフェイスが変更になった場合は（クライアントが関係しない部分であっても）その変更に引っ張られてクライアントも修正しなければいけなくなったりする。

### D (Dependency Inversion Principle) 依存性逆転の原則

抽象に依存させることで依存関係を逆転させるのが依存性逆転の原則である。
モジュール同士を密結合にせず、疎結合を保ち、変更に対して柔軟に対応できるようになる。
またテストの際にインターフェースを満たすモックを作成して、単体テストではそのモックを参照するようにすれば、テスタビリティが向上する。

### 単一責任の原則とファイル分割について

ファイル分割・・・コード量などで分割？同じ責務、似たような責務を果たすコードが点在してしまう可能性がありそう

単一責任の原則に基づく分割・・・一つのファイルの中にある責務を満たすコードが収まっている

### Open Closed の原則の実例

[コード](https://www.typescriptlang.org/play?ssl=12&ssc=1&pln=13&pc=1#code/KYOwrgtgBA4gTgQwCbCgbwFBSgQQHI4AyAmgMoAqUAvFAEQ4gIA2AngM4AutANFlAMIB5PKQCqhcvko1a-APYg2YJhwQguvAL4YMAS3XA4AMwQBjVAFEIAByZyWwVJmwBzRCgBcsd8ADcfNmYEOBYvcAgAI0N-bFNmU2UEDmAAIQUwNi8ACgBKagA+KHCouH9tDFMmBDY2AQUlFTUOKF0bJmAIUA5aq1t7R3Q+azhdADck1BThUVIAfSELADFFgEl+FYs8aSgAZhioN2RUGngjgDohEXFJLf8+U3qOODBTDjk4LOswCKZdUyhAlUQmFICU8mhyrF4olkmlwGxcoNsNg4MAOGA4CAoBwABa6NhnQHBFhQABU2LxBKmeBm80ES1W6025H22nKlWqtQYzHYzVatg6XR6bX6TiGI3GySg1NpC2Waw2W2oUAATPtDihlacUGd8EQyCydLFHs9Xu9Pt9fv8icCiqDDODIVA4kwElVYekEeC+Ci0Risbj8YSgiEyRSgzK5nLGYrDdg2ToOTVpZ6ALJqBAuQxI53Q93ALIdPoOYCZKC9OwlgDaAF1vcioKj0ZioEXK44CaikC8C1k3qomNxWyKS3kqIVnA3G36W-3mFAANTD4uOM4ut0TOEZXL7eNDgAMOVZGHZj2X7dLyqrIGAAHdcIxWJwsgBGfeHoc3+-yRTKVTqLIVXfHJPzvB8eWfF8AFZDxrO4HkUZoIjTDMszgZUvxTeF00YNCdwqeo5HaM47BcLJkOw1DDDXPMJkLEcOxyI8gA)

### リスコフの置換原則に違反すると

ある一つのサブタイプだけがスーパータイプのオブジェクトの仕様を満たしていない場合、そのサブタイプ専用の条件分岐を入れないといけなくなり、コードが複雑化する。

### インターフェースを用いる設計上のメリット

- インターフェースに依存していれば、モジュール間の関係が疎結合になり、依存先の詳細な実装に変更があったとしても、それに伴う修正が発生しなくなる（発生しても微小）
- interface を用いることで条件分岐を減らせる（[interface 無し](https://github.com/axtx4869/PrAha_Challenge/blob/main/architecture/basic-design-principle/withoutInterface.ts) vs [interface あり](https://github.com/axtx4869/PrAha_Challenge/blob/main/architecture/basic-design-principle/withInterface.ts)）

### 依存性の逆転を用いる場面

外部サービスやインフラストラクチャに依存するような実装をする場面

### デメテルの法則

「親クラス.子クラス.子クラスのメソッド/プロパティ」の様な形で、メソッド/プロパティを呼び出すのは NG であるという法則。

NG な理由

- 結合度が高く、親クラスや子クラスの詳細についての知識を持っていないといけないから。
- データ構造に修正が発生した際に、メソッドチェーンで呼び出している箇所を全て修正しないといけない。

対応策
→ インスタンス変数を private にして外部からプロパティを参照できないようにする
→ getter, setter などのアクセサ経由で呼び出すことによって、親クラスや子クラスの詳細について知りすぎてしまうという状況を回避できる

### 新人プログラマが書いたコードがダメな理由

- プロパティ単位での操作が可能になってしまい、予期せぬ箇所でプロパティの更新が行われてしまう可能性がある
- 凝集度の低いコードになっており、プロパティの用途が読み取れない

改善策
→ 不用意な getter, setter を公開せず、必要なひとまとまりの手続きのみを外部から呼び出せるようにする([例](https://github.com/axtx4869/PrAha_Challenge/blob/main/architecture/basic-design-principle/encapsulate.ts))

## 課題２

- 商品ごとに購入可能かどうかの条件が異なることも予想される。新たな購入可能条件が増えた時に purchase メソッドが肥大化してしまう

- purchase メソッドは購入処理を実行するためのメソッドだと思うが、購入可能かどうかの判定のための処理も兼ね備えてしまっている。
  すなわちメソッドが単一責任になっていないので、購入可能かどうかの判定は別メソッドに切り出した方が良いと思う。

## 課題３

### 問題点

予期せぬ箇所でクラスのプロパティが更新されてしまう可能性がある。
例えば、入籍して苗字が変わった場合に name だけを更新するというユースケースにおいて、うっかり starWorkingAt までもが更新されてしまいうる設計になっている。

### 改善

こちらで実装し直しました。

https://github.com/axtx4869/PrAha_Challenge/blob/main/architecture/basic-design-principle/kadai03.ts

外からプロパティの値を更新できないように readonly を各プロパティに付与しました。
また、プロパティを更新する際は、インスタンスを新規で生成するようにしました。

参考：[DDD のエンティティはイミュータブルな実装にしてもいいの？(サンプルコード有り)[ドメイン駆動設計 / DDD]](https://little-hands.hatenablog.com/entry/2021/12/13/immutable-entity)
