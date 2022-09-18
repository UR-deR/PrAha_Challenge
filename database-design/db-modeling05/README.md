# 解答

## 課題 1

![article (2)](https://user-images.githubusercontent.com/76472239/190883209-404dfe02-284b-4d68-a510-fa5d950a015b.png)

### articles テーブル

記事に関してのデータを持つ。記事の本文は 1000 文字程度なので、記事を更新した際は全文を保存する。

| id  | title    | content      | posted_by | posted_at                   |
| --- | -------- | ------------ | --------- | --------------------------- |
| 1   | タイトル | 親           | 20        | 2022-09-18T02:05:23.339543Z |
| 2   | タイトル | 編集後の本文 | 20        | 2022-09-19T02:05:23.339543Z |
| 3   | テスト   | content      | 30        | 2022-09-19T02:05:23.339543Z |
| 4   | タイトル | 最新の本文   | 20        | 2022-09-25T02:05:23.339543Z |

### article_edit_histories

記事は初回の投稿でも編集後の投稿でも`articles` テーブルに格納する。編集後の記事がどの記事に対しての編集を行ったのかを紐づけるためのテーブルが`article_edit_histories`テーブル。  
`article_id` : 新規の記事を投稿する時に採番される articles テーブルの id カラムの値。  
`edited_article_id` : 記事を編集した時に articles テーブルに insert する。その時に採番された articles テーブルの id カラムの値。

| article_id | edited_article_id |
| ---------- | ----------------- |
| 1          | 1                 |
| 1          | 2                 |
| 3          | 3                 |
| 1          | 4                 |

### 記事の復元

対象の記事のレコードと同じ`title`と`content`と`posted_by`を持つレコードを`articles`テーブルにインサートし、`article_edit_histories`テーブルにも 1 レコード追加する。

たとえば、`articles`テーブルの id=4 のテーブルを id=2 の状態に戻したい場合は、

1. articles テーブルに id=2 と同じ内容のレコードをインサート（id は auto increment)
1. article_edit_histories テーブルに article_id が 1 と edited_article_id が 2 のレコードを追加

## 課題 2

### 分析について

分析用途のみであり、Google Analytics と BigQuery などを用いて対応可能なのであれば、履歴データをデータベースで保存しておく必要は無いと考える。膨大なレコード数になりうる履歴データを持つことによって生じる費用について考えると、必要不可欠でないにも関わらずデータベースを用意するのは非合理的。

### 別パターンでの履歴データの表現

![article' (2)](https://user-images.githubusercontent.com/76472239/190884408-5d665772-ef4c-4dad-8271-1534d0ccbb3f.png)

`articles`テーブルの`latest_article_id`は最新の履歴 id をもつ。すなわち記事を更新するたびに`latest_article_id`を更新する。

**メリット**

- 最新の記事一覧を取得するためのクエリが簡単に記述できる。
- 記事の履歴に基づく復元などの際に、`articles`テーブルの`latest_article_id`を更新するだけなのでシンプル。

**デメリット**

- articles テーブルに更新が発生する。c.f. イミュータブルデータモデリング

  (あまりデメリットが思い浮かばず。。。これでも良いような気が)
