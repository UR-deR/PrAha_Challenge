## 解答

## 課題1

### DBではなくアプリケーションが情報を区別する責務を持つことになる

退会済みのStudentも在籍中のStudentも一緒くたにStudentsテーブルに放り込んでいるので、Studentを取得する際に毎回`taikaiFlag`を見る必要がある
```sql
SELECT * FROM Students WHERE taikaiFlag=false;
```
WHERE句を書き忘れてしまわないように、Studentを取得する際に毎回気をつけないといけない。
ヒューマンエラー防止のために可能な限りDBに責務をもたせたい


### 退会履歴を正確に保存できない

あるStudentが以下を行ったとする。
```txt
入会→退会→入会
```
この時、DBのレコード上からは、「退会歴があるのか、一度も退会したことが無いStudentなのか」の区別がつかない。
すなわち退会というイベントを正確に記録できていないと考えられる。

## 課題2

![students (1)](https://user-images.githubusercontent.com/76472239/197551818-30267a49-73ae-442d-b795-96040480b356.png)



