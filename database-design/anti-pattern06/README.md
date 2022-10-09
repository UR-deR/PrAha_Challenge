## 解答

## 課題1
`サーティーワンアイスフレーバー`というアンチパターンに該当しうると考える。

現状の設計だと以下の問題点がある。

### `status`一覧の取得が不完全

statusの値の一覧を取得する際に以下のようなクエリを実行することになる。
```sql
SELECT DISTINCT status FROM STUDENT;
```

上記のクエリを実行しても、あるstatusを持つレコードが存在しない場合もありうるので、全てのstatusを抜け漏れなく取得できている保証が無い。

### 挿入できる値の候補を追加・変更・削除したい場合の対応

check制約に値を追加・変更・削除したりする構文が無いため、check制約をDROPした後、ALTER文を発行してフィールドを再定義する必要がある。
特に"変更"と"削除"の場合は既存のレコード内のstatusカラムの値との整合性を保つために注意が必要である。


※CHECK制約から`suspended`を取り除いた場合→既存のレコードでstatus=suspendedを持つものを適切に更新させる


※CHECK制約の`studying`を`belonging`に変更した場合　→ check制約をDROPした後、既存のレコードでstatus=studyingを持つものを`status=belonging`に変更してから再度CHECK成約を付与


運用中のサービスのDBの場合、サービスを一時停止する必要性が生じるかもしれない。


## 課題2

以下のようにstatusは別のテーブルに切り出すことによって、上記の問題点が解決し、参照整合性制約により不正な値が混入することを防げる


![students](https://user-images.githubusercontent.com/76472239/194746311-d841db1f-7c4b-4d08-8584-e8cafb2f57b2.png)

