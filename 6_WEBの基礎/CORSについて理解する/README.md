# CORSについて理解する

## 課題1

### CORSの仕組み

CORSは、ウェブブラウザが異なるオリジンからのリソースにアクセスする際に、セキュリティを確保するための仕組みである。通常、ウェブブラウザはセキュリティ上の理由から、オリジン間のリソース共有を制限している。しかし、CORSを使用することで、サーバーが特定のオリジンからのリクエストを許可するように設定できる。

CORSには「simple request」と「preflight request」の2種類のリクエストがある。simple requestは、特定の条件を満たすリクエストである。例えば、GET、POST、HEADのいずれかのHTTPメソッドを使用し、特定の標準的なヘッダーのみを含むリクエストである。これに対して、条件を満たさないリクエストにはpreflight requestが必要である。

preflight requestは、実際のリクエストが送信される前に、ブラウザがサーバーに対して`OPTIONS`メソッドを使用して送信するリクエストである。このリクエストは、サーバーが特定のオリジンからのリクエストを許可するかどうかを確認するものである。サーバーが許可する場合、ブラウザに適切なCORSヘッダーを含むレスポンスを送信する。

CORSヘッダーの一つに`Access-Control-Allow-Origin`があり、このヘッダーは、サーバーがどのオリジンからのリクエストを許可するかを指定する。例えば、`Access-Control-Allow-Origin: *`と設定することで、すべてのオリジンからのリクエストを許可する。また、特定のオリジンを指定することも可能である。例えば、`Access-Control-Allow-Origin: https://example.com`と設定すると、その特定のオリジンからのリクエストのみが許可される。


### 「Access-Control-Allow-Origin: *」について

「Access-Control-Allow-Origin: *」の設定が問題となるケースの一つは、悪意のあるウェブサイトからの攻撃である。この設定を使用すると、すべてのオリジンからのリクエストが許可される。その結果、悪意のある第三者がCSRF攻撃やXSS攻撃を行いやすくなる。

具体的には、ユーザーが信頼できるウェブサイトにログインしている間に、別の悪意のあるウェブサイトがそのユーザーの資格情報を利用して、信頼できるサイトにリクエストを送信することが可能となる。これにより、ユーザーのデータが盗まれたり、アカウントが乗っ取られたりするリスクが高まる。したがって、「Access-Control-Allow-Origin: *」と設定するのは避け、必要なオリジンだけを明示的に指定すべきである。

### Simple Requestの条件

1. HTTPメソッドが以下のうちのどれかに該当する
    - GET
    - POST
    - HEAD

2. リクエストヘッダーが以下のものだけで構成されている
    - Forbidden Headers
    - Accept
    - Accept-Language
    - Content-Language
    - Content-Type (`application/x-www-form-url-encoded`, `text/plain`以外はNG)
    - Range([単純範囲ヘッダー値](https://fetch.spec.whatwg.org/#simple-range-header-value)に限る)
    - etc

3. Content-Typeが以下の値の場合
    - `application/x-www-form-url-encoded`
    - `text/plain`
    - `multipart/form-data`

4. XMLHttpRequest オブジェクトを使用してリクエストを行う場合は、`XMLHttpRequest.upload`プロパティから返されるオブジェクトにイベントリスナーが登録されていない

5. リクエストに`ReadableStream`オブジェクトが使用されていないこと。

参考: [単純リクエスト](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS#%E5%8D%98%E7%B4%94%E3%83%AA%E3%82%AF%E3%82%A8%E3%82%B9%E3%83%88)

### Simple Requestを送信したが、Access-Control-Allow-Originヘッダーに、リクエスト送信元のオリジンが含まれない場合

- ブラウザはリクエストの元にレスポンスデータを提供しない（JavaScriptからアクセスさせない）
- consoleに以下のようなエラーメッセージを出力する。

```txt
localhost/:1 Access to fetch at 'http://localhost:3000/cors2' from origin 'http://localhost:8082' has been blocked by CORS policy: The 'Access-Control-Allow-Origin' header has a value 'http://localhost:8081' that is not equal to the supplied origin. Have the server send the header with a valid value, or, if an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.Understand this error
(index):39 
```

```txt
GET http://localhost:3000/cors2 net::ERR_FAILED 200 (OK)
(anonymous) @ (index):39Understand this error
```

```txt
(index):46 TypeError: Failed to fetch
    at HTMLButtonElement.<anonymous> ((index):39:9)
```

### aタグを用いたリクエストでCORS制約が発生しない理由

aタグによるリクエストは、リソースの共有ではなく、ドキュメントの要求である。リンクをクリックして異なるオリジンに移動する行為は、単にブラウザが新しいURLに対してページをリクエストし、そのページを表示するというものである。

ユーザーの操作によるリンクのクリックは、ブラウザが新しいリソースを直接ナビゲートするだけであり、オリジン間のデータのやりとりや操作が行われるわけではありません。

- **cross**-originでない
- resource-**sharing**でない

と言える。
よって、CORS制約が適用されない。

**実演**

<img width="1203" alt="スクリーンショット 2024-08-04 16 02 26" src="https://github.com/user-attachments/assets/5041c9ee-507f-4f09-beeb-4b0356346879">



### XHRによるCross-OriginリクエストにおけるCookieの送信について

[withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)プロパティを`true`にすることで、Cookieが送信されるようになる。

## 課題2

### Q1

<details><summary>「aタグ要素のクリックによる別オリジンへのリクエスト」と「window.fetchによる別オリジンへのリクエスト」のそれぞれに関して、リクエストヘッダー`Sec-Fetch-Mode`にはどの値がセットされるか？</summary>
aタグ要素のクリックによる別オリジンへのリクエスト→ navigate

window.fetchによる別オリジンへのリクエスト→ cors
参考: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-Mode
</details>

### Q2

<details><summary>「localhost:8000」から「localhost:3000」にwindow.fetchを用いてリクエストした時、リクエストヘッダのSec-Fetch-Siteの値がcross-siteではなくsame-siteなのはなぜか？</summary>
ポート番号が異なるものの、schemeとhostが同じなのでsame-siteと言えるから。

※ポート番号が異なるため、same-originではない。
参考: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Sec-Fetch-Site
</details>

### Q3

<details><summary>リクエストヘッダのmodeの値としてno-corsを指定する。window.fetchを用いてContent-Typeにapplication/jsonを指定してGETリクエストをする。この時、CORSエラーは発生する？発生しない？</summary>
CORSエラーは発生する。
modeをno-corsにすることは、リクエストがsimple requestでなければならないことを意味する。Content-Typeにapplication/jsonを指定すると、simple requestではなくなるためCORSエラーが発生する。
</details>



## 課題3

[nodejs-express-playground/app.ts](https://github.com/UR-deR/nodejs-express-playground/blob/eec3438e793f9e8386756ac9be224aa9b6ab9cc1/app.ts#L80-L100)にて実装

- サーバーサイドオリジン: `http://localhost:3000`
- 許可されたクライアントサイドオリジン: `http://localhost:8081`

**ケース1: Simple Requestの時はPreflightが行われない**
<img width="1572" alt="simple-request-from-allowd-origin" src="https://github.com/user-attachments/assets/0977bd2b-fe5b-4c44-8214-dfd7ed472ca9">





**ケース2: Simple Requestに該当しない場合はPreflightが送信される**

<img width="1564" alt="options-preflight-request-from-allowed-origin" src="https://github.com/user-attachments/assets/31a5ed45-1999-4d8a-a755-6cd3e159a0a0">
<img width="784" alt="post-request-from-allowed-origin" src="https://github.com/user-attachments/assets/16de37b5-492b-4eac-93df-758def5c4441">


**ケース3: 許可されていないオリジンからのリクエストの場合、CORSエラーレスポンスが返される**

<img width="436" alt="non-allowed-origin" src="https://github.com/user-attachments/assets/2268ff8d-48d8-49a7-8f14-b7e587b4979d">


## 課題4

> 追加のHTTPヘッダーを使用して、あるオリジンで動作しているウェブアプリケーションに、異なるオリジンに選択されたリソースへのアクセス権を与えるようブラウザーに指示するための仕組み

引用: [オリジン間リソース共有 (CORS)](https://developer.mozilla.org/ja/docs/Web/HTTP/CORS)

とあるように、CORSはブラウザでのみ適用される仕組みである。よって、ターミナルなどの非ブラウザからリクエストした場合には、別オリジンからのリソースアクセスを許してしまう。

```shell
❯ curl -v 'http://localhost:3000/cors' \
        -X 'POST' \
        -H 'Content-Type: application/json'
*   Trying 127.0.0.1:3000...
* Connected to localhost (127.0.0.1) port 3000 (#0)
> POST /cors HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.1.2
> Accept: */*
> Content-Type: application/json
> 
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Access-Control-Allow-Origin: http://localhost:8081
< Vary: Origin
< Content-Type: application/json; charset=utf-8
< Content-Length: 40
< ETag: W/"28-6cLad6grXokfAI1Px7xBYWhtpoQ"
< Date: Sat, 03 Aug 2024 06:45:41 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< 
* Connection #0 to host localhost left intact
{"message":"CORS request is successful"}
```
