# 解答

![penpen](https://user-images.githubusercontent.com/76472239/189506890-57390d99-4285-43a2-8889-c63229b0934c.png)

### reminders テーブル

**frequency_type**  
`"DAILY", "WEEKLY", "MONTHLY"`のいづれか

**frequency_interval**  
`frequency_type` が  
`DAILY`: 0 ~ 6  
`WEEKLY`: 1 ~ 7(1:月, 2:火,...7:日)  
`MONTHLY` : 1 ~ 31

例:

`frequency_type="DAILY"`で`frequency_interval=0`
→ 毎日リマインド

`frequency_type="DAILY"`で`frequency_interval=3`
→3 日おきにリマインド

`frequency_type="WEEKLY"`で`frequency_interval=1`
→ 毎週月曜日にリマインド

`frequency_type="MONTHLY"`で`frequency_interval=20`
→ 毎月 20 日にリマインド

### batch_logs テーブル

1h おきにバッチが動くので、一日に同一リマインダーが複数回送信されないようにするために`finished_datetime`カラム(バッチの終了時刻)を用意した。

### reminder_recipients テーブル

リマインダーとメンションする対象の関係性を表現するためのテーブル。
