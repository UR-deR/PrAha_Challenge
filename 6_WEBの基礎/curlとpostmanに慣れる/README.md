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