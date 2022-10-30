## 解答

## 課題 1

### Check を使うべきかどうか

**前提**

クライアントサイド・サーバーサイドでも値の妥当性の検証は行なっているとする。その上で、データベースレベルにおいても値の妥当性の検証が必要かについて考える。

**pros**

- よりデータの妥当性が確保できる。特に、ssh でサーバーにアクセスして DB に対して直接更新をかける際に、check 制約が無いと許容すべきでないドメインをもった値で更新される可能性が生まれてしまう。

- DB アクセスするアプリケーションが複数ある場合、その内のどれかのバリデーションに誤りがあったとしても、check 制約があれば不当な値は入らない。

**cons**

- アプリケーション側のバリデーションとの整合性を保つためのコストが生じる。バリデーションルールが変更した際に、両方とも修正しないといけない。

- check 制約の制約条件の追加・変更・削除はできない。check 制約で許容するメールアドレスのドメインが不変とは限らないので、check 制約を用いるとサービスを止めずに変更することができない

**結論**

サーティーワンフレーバーに抵触するので check 制約を用いるべきでは無いとおもう。

**参考記事**  
[Do you need to fully validate data both in Database and Application?](https://stackoverflow.com/questions/65494755/do-you-need-to-fully-validate-data-both-in-database-and-application)

[Should data validation be done at the database level?](https://stackoverflow.com/questions/1127122/should-data-validation-be-done-at-the-database-level)

[10 章 31 Flavors(31 のフレーバー)](https://qiita.com/Inagawa/items/6e9745d2598aa713a1f3)

[Is it good to use check constraints for business rules](https://stackoverflow.com/questions/1714293/is-it-good-to-use-check-constraints-for-business-rules)

### Trigger を使うべきかどうか

**pros**

- コード量の削減
- User テーブルからレコードを削除した後に WithdrawnUser テーブルへの INSERT 文 の発行漏れが起き得ない。(複数アプリケーションから DB を操作するような状況で有効な手段)
- WithdrawnUser テーブルへの INSERT を一元管理できる。

**cons**

- コード上でテーブルへの操作が追いにくい
- アプリケーションのコードからは テーブルへの操作が見えないので、Trigger の存在を忘れてしまう or 暗黙的な INSERT に途中から参画した開発者が気付きにくい
- 自由度が落ちる。User テーブルからレコードを削除した後に WithdrawnUser テーブルへの INSERT 文 の発行を必要としないユースケースが発生した際に対応できない。  
  (`e.g.` 間違えて User を作っちゃったから、User テーブルからレコードを削除しても退会として記録に残す必要が無いケースや、User テーブルからレコードを削除した後に `TemporarySuspendedUser` テーブルへの INSERT 文が必要となるケースが発生した場合 )

**結論**

Trigger は使わないべき。  
User テーブルからレコードを削除するという命令が、それ以上の意味を持つことになるため良くも悪くも副作用が発生する。Trigger と機能的に同等なコードを書くことは可能なので、データベースに対しての操作はコード上で明示的に書いた方が分かりやすい。データベースに対しての DML はアプリケーション側のコードに全て寄せるなどの方針を立てた方がシンプルだし、保守・改修フェーズから参画する開発者が混乱しなくて済むと思う。

**参考記事**

[MySQL Trigger](https://www.javatpoint.com/mysql-trigger#:~:text=We%20need%2Fuse%20triggers%20in%20MySQL%20due%20to%20the%20following,maintaining%20audit%20trails%20in%20tables.)

[Are database triggers necessary?](https://stackoverflow.com/questions/460316/are-database-triggers-necessary)

### Enum を使うべきかどうか

**pros**

- DB 内のテーブルと外部キーの数を減らせる
- 参照用の gender テーブルを設ける場合は`JOIN`が必要だが、enum を使えば JOIN は必要無いのでパフォーマンス的にはベター(JOIN を使ったとて、ある一定規模に達するまでは性能面で問題が発生するとは思えない。性能面で問題が発生してから正規化を解除しても良いと思う)
- enum で定義したもの以外の値が入ることがない(enum ではなく、参照用のテーブルとして gender テーブルを設けた場合でも参照整合性制約により同様なことを実現できる)

**cons**

- enum を採用する場合、上記クエリで性別一覧を取得するが、実際にレコードに存在している値しか取得できないため全ての gender を取得できる保証が無い。(`cf.` enum ではなく、参照用のテーブルとして gender テーブルを設ければこの問題は解消できる)

```sql
 SELECT DISTINCT gender FROM User;
```

- enum として定義する値を追加・変更・削除するために`ALTER TABLE`でテーブル全体を再構築する必要がある。(`cf.` enum ではなく、参照用のテーブルとして gender テーブルを設ければ、`ALTER TABLE`を発行する必要が無いので比較的容易に対応できる)

- enum で定義した値を他のテーブルから参照することができない(`cf.` enum ではなく、参照用のテーブルとして gender テーブルを設ければ、他のテーブルから gender 一覧を参照することができる)

**結論**
LGBTQ への対応が発生する可能性を否定できないので、enum ではなく gender テーブル用意するのが無難な気がする

**参考記事**

[8 Reasons Why MySQL's ENUM Data Type Is Evil](https://web.archive.org/web/20180324095351/http://komlenic.com/244/8-reasons-why-mysqls-enum-data-type-is-evil/)

### Domain を使うべきかどうか

**pros**

- よりデータの妥当性が確保できる。特に、ssh でサーバーにアクセスして DB に対して直接更新をかける際に、データベースレベルで値の妥当性の検証が無いと許容すべきでない不当な値で更新される可能性が生まれてしまう。

- DB アクセスするアプリケーションが複数ある場合、その内のどれかのバリデーションに誤りがあったとしても、データベースレベルで値の妥当性の検証があれば不当な値は入らない。

**cons**

- アプリケーション側のバリデーションとの整合性を保つためのコストが生じる。バリデーションルールが変更した際に、両方とも修正しないといけない。

- check 制約同様、制約条件に変更がある場合に対応できない。一度サービス止めてテーブル定義を変更する DDL を発行しないといけない

**結論**

郵便番号の特性上、制約条件が変更になることはないように思うので cons は無視できる。よって Domain を使うべきだと考える。

## 課題 2

### アプリケーション側で制約を課すアプローチを採用する場合

DB 側のバリデーションで対応できないようなアプリケーション特有の検証などはアプリケーション側で行わないといけない。また、DB の負荷を減らすためにアプリケーション側で弾けるものはアプリケーション側で弾いた方が良いと思う。

### データベース側で制約を課すアプローチを採用する場合

複数のアプリケーションからアクセスされる DB の場合は、アプリケーション側のバリデーションが統一されていないと不当な値が INSERT されうるので、データベース側で制約を課した方が良いと思う。また ssh などで接続して手動でデータ修正を行うようなケースもありうる場合はヒューマンエラーを考慮してデータベース側で制約を課した方が良いと思う。

## 課題 3

### enum

以下のように学部学生に関しての情報を持つ`undergraduate_students`テーブルを考える。DB 設計者は department カラムを添付画像のように enum 型で定義したとする。しかし、学部の新設(e.g. 薬学部ができた)や学部の統廃合(e.g. 工学部と理学部が統合して理工学部になった)は現実的にあり得る話なので、将来的に不変でないカラムに対して enum で制約をかけるのは良くなかった、みたいなことを考えました。
<img width="493" alt="スクリーンショット 2022-10-30 23 14 37" src="https://user-images.githubusercontent.com/76472239/198883405-2f16ed75-d260-4e07-a0dd-a73a10b5e9dd.png">
