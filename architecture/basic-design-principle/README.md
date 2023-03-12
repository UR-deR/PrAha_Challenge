#　基本的な設計原則

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

インターフェースに依存していれば、モジュール間の関係が疎結合になり、依存先の詳細な実装に変更があったとしても、それに伴う修正が発生しなくなる（発生しても微小）

### 依存性の逆転を用いる場面

外部サービスやインフラストラクチャに依存するような実装をする場面

### デメトルの法則

「親クラス.子クラス.子クラスのメソッド/プロパティ」の様な形で、メソッド/プロパティを呼び出すのは NG であるという法則。

→ 結合度が高く、親クラスや子クラスの詳細についての知識を持っていないといけないから。したがって、関心の分離ができていないと考えられる。

プロパティやメソッドを直接参照せずに getter, setter などのアクセサ経由で呼び出すことによって、親クラスや子クラスの詳細について知りすぎてしまうという状況を回避できる

### 新人プログラマが書いたコードがダメな理由

- Getter, Setter が露出している
- プロパティ単位での操作が可能になっている

## 課題２
