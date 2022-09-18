# 解答

## 課題 1

![article (2)](https://user-images.githubusercontent.com/76472239/190883209-404dfe02-284b-4d68-a510-fa5d950a015b.png)


### articles テーブル

記事に関してのデータを持つ。記事の本文は 1000 文字程度なので、記事を更新した際は全文を保存する。

| id  | title    | content      | posted_by | posted_at                   |
| --- | -------- | ------------ | --------- | --------------------------- |
| 1   | タイトル | 編集前の本文 | 20        | 2022-09-18T02:05:23.339543Z |
| 2   | タイトル | 編集後の本文 | 20        | 2022-09-19T02:05:23.339543Z |
| 3   | テスト   | content      | 30        | 2022-09-19T02:05:23.339543Z |

### article_edit_histories

記事は初回の投稿でも編集後の投稿でも`articles` テーブルに格納する。編集後の記事がどの記事に対しての編集を行ったのかを紐づけるためのテーブルが`article_edit_histories`テーブル。  
`article_id` : 新規の記事を投稿する時に採番される articles テーブルの id カラムの値。  
`edited_article_id` : 記事を編集した時に articles テーブルに insert する。その時に採番された articles テーブルの id カラムの値。

| article_id | edited_article_id |
| ---------- | ----------------- |
| 1          | 1                 |
| 1          | 2                 |
| 3          | 3                 |

## 課題 2

![article' (2)](https://user-images.githubusercontent.com/76472239/190884408-5d665772-ef4c-4dad-8271-1534d0ccbb3f.png)


