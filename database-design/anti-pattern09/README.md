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

## 課題 2

## 課題 3

## 参考記事
