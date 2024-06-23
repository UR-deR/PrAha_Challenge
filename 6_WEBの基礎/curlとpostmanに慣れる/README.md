# curlとpostmanに慣れる

## 問題1

リクエスト

```sh
curl -X GET "https://httpbin.org/get" \
-H "accept: application/json" \
-H "Accept: */*" \
-H "Host: httpbin.org" \
-H "User-Agent: curl/7.54.0" \
-H "X-Test: hello"
```

レスポンス

```json
{
  "args": {},
  "headers": {
    "Accept": "application/json,*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0",
    "X-Amzn-Trace-Id": "Root=1-66743e54-70078ac6100d46a5365a13ed",
    "X-Test": "hello"
  },
  "origin": "126.39.137.55",
  "url": "https://httpbin.org/get"
}
```

## 問題2

リクエスト

```sh
curl -X POST "https://httpbin.org/post" \
-H "Content-Type: application/json" \
-d '{"name": "hoge"}'
```

レスポンス

```json
{
  "args": {},
  "data": "{\"name\": \"hoge\"}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "16",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/8.1.2",
    "X-Amzn-Trace-Id": "Root=1-66743ecb-14c3e84c7c6b546d6dbf7781"
  },
  "json": {
    "name": "hoge"
  },
  "origin": "126.39.137.55",
  "url": "https://httpbin.org/post"
}
```

## 問題3

リクエスト

```sh
curl -X POST "https://httpbin.org/post" \
-H "Content-Type: application/json" \
-d '{"userA": {"name": "hoge", "age": 29}}'
```

レスポンス

```json
{
  "args": {},
  "data": "{\"userA\": {\"name\": \"hoge\", \"age\": 29}}",
  "files": {},
  "form": {},
  "headers": {
    "Accept": "*/*",
    "Content-Length": "38",
    "Content-Type": "application/json",
    "Host": "httpbin.org",
    "User-Agent": "curl/8.1.2",
    "X-Amzn-Trace-Id": "Root=1-66743f18-5acf596b67d264c23afd03b4"
  },
  "json": {
    "userA": {
      "age": 29,
      "name": "hoge"
    }
  },
  "origin": "126.39.137.55",
  "url": "https://httpbin.org/post"
}
```

## 課題4

リクエスト

```sh
curl -X POST "https://httpbin.org/post" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "user[name]=hoge"
```

レスポンス

```json
{
  "args": {},
  "data": "",
  "files": {},
  "form": {
    "user[name]": "hoge"
  },
  "headers": {
    "Accept": "*/*",
    "Content-Length": "15",
    "Content-Type": "application/x-www-form-urlencoded",
    "Host": "httpbin.org",
    "User-Agent": "curl/8.1.2",
    "X-Amzn-Trace-Id": "Root=1-66744016-0147bcf749e01a8376994f98"
  },
  "json": null,
  "origin": "126.39.137.55",
  "url": "https://httpbin.org/post"
}
```

TODO
- curlに関するクイズ
- postmanに関するクイズ

## 問題2
### Curlクイズ

**Q1**

<summery>

送信されたリクエストヘッダや接続プロシージャなど、リクエストに関するより多くの情報を見たい場合、どのようなオプションを指定すべきでしょうか？

<details>

- `-v`

- `-vo`

- `--verbose`

```shell
❯ curl -v -X GET "https://httpbin.org/get" \
      -H "accept: application/json" \
      -H "Accept: */*" \
      -H "Host: httpbin.org" \
      -H "User-Agent: curl/7.54.0" \
      -H "X-Test: hello"
Note: Unnecessary use of -X or --request, GET is already inferred.
*   Trying 44.195.190.188:443...
* Connected to httpbin.org (44.195.190.188) port 443 (#0)
* ALPN: offers h2,http/1.1
* (304) (OUT), TLS handshake, Client hello (1):
*  CAfile: /etc/ssl/cert.pem
*  CApath: none
* (304) (IN), TLS handshake, Server hello (2):
* TLSv1.2 (IN), TLS handshake, Certificate (11):
* TLSv1.2 (IN), TLS handshake, Server key exchange (12):
* TLSv1.2 (IN), TLS handshake, Server finished (14):
* TLSv1.2 (OUT), TLS handshake, Client key exchange (16):
* TLSv1.2 (OUT), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (OUT), TLS handshake, Finished (20):
* TLSv1.2 (IN), TLS change cipher, Change cipher spec (1):
* TLSv1.2 (IN), TLS handshake, Finished (20):
* SSL connection using TLSv1.2 / ECDHE-RSA-AES128-GCM-SHA256
* ALPN: server accepted h2
* Server certificate:
*  subject: CN=httpbin.org
*  start date: Sep 21 00:00:00 2023 GMT
*  expire date: Oct 18 23:59:59 2024 GMT
*  subjectAltName: host "httpbin.org" matched cert's "httpbin.org"
*  issuer: C=US; O=Amazon; CN=Amazon RSA 2048 M02
*  SSL certificate verify ok.
* using HTTP/2
* h2 [:method: GET]
* h2 [:scheme: https]
* h2 [:authority: httpbin.org]
* h2 [:path: /get]
* h2 [accept: application/json]
* h2 [accept: */*]
* h2 [user-agent: curl/7.54.0]
* h2 [x-test: hello]
* Using Stream ID: 1 (easy handle 0x13e812400)
> GET /get HTTP/2
> Host: httpbin.org
> accept: application/json
> Accept: */*
> User-Agent: curl/7.54.0
> X-Test: hello
>
< HTTP/2 200
< date: Sun, 23 Jun 2024 14:25:13 GMT
< content-type: application/json
< content-length: 296
< server: gunicorn/19.9.0
< access-control-allow-origin: *
< access-control-allow-credentials: true
<
{
  "args": {},
  "headers": {
    "Accept": "application/json,*/*",
    "Host": "httpbin.org",
    "User-Agent": "curl/7.54.0",
    "X-Amzn-Trace-Id": "Root=1-66783049-009d905d400006fe5ef26894",
    "X-Test": "hello"
  },
  "origin": "126.39.137.55",
  "url": "https://httpbin.org/get"
}
* Connection #0 to host httpbin.org left intact

```

</details>

</summery>

**問題2**

`--data`オプションを用いてPOSTリクエストする際に、`--data`オプションの値が長すぎてターミナルに収まらない場合に、どのような対処方法があるか。


<summery>

送信されたリクエストヘッダや接続プロシージャなど、リクエストに関するより多くの情報を見たい場合、どのようなオプションを指定すべきでしょうか？

<details>

`@`を用いて、`.txt`ファイルにペイロードを記述する。

```shell
curl --data @params.txt example.com
```

`.json`ファイルを用いてjsonデータを送信することも可能

```shell
curl --data @data.json https://httpbin.org/post
```

</details>

</summery>
