# リクエストをパースするWEBサーバを作ってみる

## 課題 1

[nodejs-express-playground/app.ts](https://github.com/UR-deR/nodejs-express-playground/blob/main/app.ts)にて実装。

```shell
❯ curl localhost:3000 -H "Content-Type: application/json"
{"text":"Hello World!"}

❯ curl localhost:3000 -d '{"name": "hoge"}' -H "Content-Type: application/json"
{"name":"hoge"}

❯ curl --dump-header - localhost:3000 -d '{"name": "hoge"}'

HTTP/1.1 400 Bad Request
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 11
ETag: W/"b-EFiDB1U+dmqzx9Mo2UjcZ1SJPO8"
Date: Sun, 14 Jul 2024 00:59:44 GMT
Connection: keep-alive
Keep-Alive: timeout=5

Bad Request
```


## 課題2

### application/x-www-form-urlencoded

```shell
❯ node app.ts
Example app listening on port 3000

❯ curl 'http://localhost:3000/form-urlencoded' \
        --header 'Accept: */*' \
        --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'user[name]=John' \
        --data-urlencode 'user[email]=john@example.com' \
        --data-urlencode 'tags[]=tag1' \
        --data-urlencode 'tags[]=tag2' \
        --data-urlencode 'tags[]=tag3' \
        --trace-ascii -

== Info:   Trying 127.0.0.1:3000...
== Info: Connected to localhost (127.0.0.1) port 3000 (#0)
=> Send header, 198 bytes (0xc6)
0000: POST /form-urlencoded HTTP/1.1
0020: Host: localhost:3000
0036: Accept: */*
0043: User-Agent: Thunder Client (https://www.thunderclient.com)
007f: Content-Type: application/x-www-form-urlencoded
00b0: Content-Length: 82
00c4:
=> Send data, 82 bytes (0x52)
0000: user[name]=John&user[email]=john%40example.com&tags[]=tag1&tags[
0040: ]=tag2&tags[]=tag3
<= Recv header, 22 bytes (0x16)
0000: HTTP/1.1 201 Created
<= Recv header, 23 bytes (0x17)
0000: X-Powered-By: Express
<= Recv header, 47 bytes (0x2f)
0000: Content-Type: application/json; charset=utf-8
<= Recv header, 20 bytes (0x14)
0000: Content-Length: 81
<= Recv header, 42 bytes (0x2a)
0000: ETag: W/"51-TehzKuLG5Ch2GIIHZa5inkA6ZiU"
<= Recv header, 37 bytes (0x25)
0000: Date: Sat, 13 Jul 2024 03:44:33 GMT
<= Recv header, 24 bytes (0x18)
0000: Connection: keep-alive
<= Recv header, 23 bytes (0x17)
0000: Keep-Alive: timeout=5
<= Recv header, 2 bytes (0x2)
0000:
<= Recv data, 81 bytes (0x51)
0000: {"user":{"name":"John","email":"john@example.com"},"tags":["tag1
0040: ","tag2","tag3"]}
{"user":{"name":"John","email":"john@example.com"},"tags":["tag1","tag2","tag3"]}== Info: Connection #0 to host localhost left intact
```


### application/json


```shell
❯ node app.ts
Example app listening on port 3000

❯ curl 'http://localhost:3000/' \
        --header 'Accept: */*' \
        --header 'User-Agent: Thunder Client (https://www.thunderclient.com)' \
        --header 'Content-Type: application/json' \
        --data-raw '{
      "user": {
        "name": "John",
        "email": "john@example.com"
      },
      "tags": ["tag1", "tag2", "tag3"]
    }' \
        --trace-ascii -
== Info:   Trying 127.0.0.1:3000...
== Info: Connected to localhost (127.0.0.1) port 3000 (#0)
=> Send header, 167 bytes (0xa7)
0000: POST / HTTP/1.1
0011: Host: localhost:3000
0027: Accept: */*
0034: User-Agent: Thunder Client (https://www.thunderclient.com)
0070: Content-Type: application/json
0090: Content-Length: 119
00a5:
=> Send data, 119 bytes (0x77)
0000: {.    "user": {.      "name": "John",.      "email": "john@examp
0040: le.com".    },.    "tags": ["tag1", "tag2", "tag3"].  }
<= Recv header, 22 bytes (0x16)
0000: HTTP/1.1 201 Created
<= Recv header, 23 bytes (0x17)
0000: X-Powered-By: Express
<= Recv header, 47 bytes (0x2f)
0000: Content-Type: application/json; charset=utf-8
<= Recv header, 20 bytes (0x14)
0000: Content-Length: 81
<= Recv header, 42 bytes (0x2a)
0000: ETag: W/"51-TehzKuLG5Ch2GIIHZa5inkA6ZiU"
<= Recv header, 37 bytes (0x25)
0000: Date: Sat, 13 Jul 2024 03:46:44 GMT
<= Recv header, 24 bytes (0x18)
0000: Connection: keep-alive
<= Recv header, 23 bytes (0x17)
0000: Keep-Alive: timeout=5
<= Recv header, 2 bytes (0x2)
0000:
<= Recv data, 81 bytes (0x51)
0000: {"user":{"name":"John","email":"john@example.com"},"tags":["tag1
0040: ","tag2","tag3"]}
{"user":{"name":"John","email":"john@example.com"},"tags":["tag1","tag2","tag3"]}== Info: Connection #0 to host localhost left intact
```

### Send dataを比較する

**URLエンコードデータ (application/x-www-form-urlencoded)**

```txt
user[name]=John&user[email]=john%40example.com&tags[]=tag1&tags[]=tag2&tags[]=tag3
```

**JSONデータ (application/json)**

```json
{
  "user": {
    "name": "John",
    "email": "john@example.com"
  },
  "tags": ["tag1", "tag2", "tag3"]
}
```

データ形式:

- JSON: データがネストされたオブジェクトと配列を自然に表現できる。
- URLエンコード: キーと値のペアを=で結び、&で区切る形式。

データサイズ:

- JSON: 119 bytes
- URLエンコード: 82 bytes

データ内容:

- JSON: データが人間にとって読みやすく、ネスト構造もサポートされている。
- URLエンコード: キーと値がフラットに表現され、URLエンコードされた形式で特殊文字（例: @が%40）がエンコードされる。


使い分け: 

- application/json: 複雑なデータ構造やAPIとのやり取り、データの可読性を重視する場合に適しています。
- application/x-www-form-urlencoded: シンプルなデータ送信、特にHTMLフォームから送信されるデータや古いシステムとの互換性が必要な場合に適しています。