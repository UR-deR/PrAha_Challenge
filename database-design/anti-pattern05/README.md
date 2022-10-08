## 解答

## 課題 1

### 一つのテーブル内にさまざまなリソースとイベントが内包されている

`NewCustomer`テーブルはテーブル名から読み取るにリソースに関してのテーブルなのだが、複数のイベントに関しての情報も持ってしまっている。

- 電話（called, callNote）
- 面談 (metOnce, metAt)
- 成約 (closed, closedAt)

例えば以下の問題が発生し得る。  
ある NewCustomer が成約してくれたが、種々の事情により成約を破棄したいと申し出たとする。このようなケースが発生した際に現状の設計だと、成約前(`NewCustomer.closed=false`), 成約(`NewCustomer.closed=true`), 成約破棄(`NewCustomer.closed=false`)となるため、成約前と成約破棄した NewCustomer の区別が DB のレコードからは不可能である。すなわち、成約というイベントを DB で正確に記録することが難しくなる。

```
「この人、`NewCustomer.closed=false`だから成約前じゃん。成約してくれないかな〜」って思ってたが、実は先日成約破棄された人でした、、、
```

みたいな事案が起きうると思いました。
