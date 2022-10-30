## 解答

## 課題 1

### Check を使うべきかどうか

**前提**

クライアントサイド・サーバーサイドでも値の妥当性の検証は行なっているとする。その上で、データベースレベルにおいても値の妥当性の検証が必要かについて考える。

**pros**

- よりデータの妥当性が確保できる。特に、ssh でサーバーにアクセスして DB に対して直接更新をかける際に、check 制約が無いと許容すべきでないドメインをもった値で更新される可能性が生まれてしまう。

- DB アクセスするアプリケーションが複数ある場合、その内のどれかのバリデーションに誤りがあったとしても、check 制約があれば NG な値は入らない。

**cons**

- アプリケーション側のバリデーションとの整合性を保つためのコストが生じる。バリデーションルールが変更した際に、両方とも修正しないといけない。

**結論**

DB を操作する主体の数に関わらず、ssh 接続してデータ修正が発生するケースが生じることも考えて、check 制約は付与すべきだと思う。check 制約を付与していないと、不整合なデータを持ったまま運用され続けてしまって、汚いデータベースになってしまう可能性がある。それよりも、

> アプリケーション側のバリデーションとの整合性を保つためのコストが生じる。

のコストを払う方がマシだし、バリデーションルールの変更は頻繁に発生するものでもないと思う。

**参考記事**  
[Do you need to fully validate data both in Database and Application?](https://stackoverflow.com/questions/65494755/do-you-need-to-fully-validate-data-both-in-database-and-application)

[Should data validation be done at the database level?](https://stackoverflow.com/questions/1127122/should-data-validation-be-done-at-the-database-level)

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

## 課題 2

## 課題 3

## 参考記事
