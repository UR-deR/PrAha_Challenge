# よく使う HTTP ヘッダを理解する

## 課題 1

### 1. Host

リクエストヘッダの`Host`は、リクエスト送信先のサーバーのホストとポート番号を指定するものである。

```http
Host: <host>:<port>
```


ポート番号が指定されていなかった場合には、

- httpならば、443
- httpsならば、80

がデフォルトのポート番号としてセットされる。

ブラウザに`https://example.com`と入力して送信すると、

```http
Host: example.com
```

がHostヘッダに指定される。

Hostヘッダの主な役割は、クライアントが通信したい特定のバックエンドコンポーネントやアプリケーションを特定することである。複数のウェブサイト、ウェブアプリケーション、またはサービスが同じIPアドレスとサーバーでホストされているシナリオでは、Hostヘッダーは意図した宛先に受信リクエストをルーティングする上で重要な役割を果たす。


HostヘッダはHTTP/1.1におけるHTTPリクエストにおいては必ず指定しないといけない。

[MDN](https://developer.mozilla.org/ja/)や[X](https://x.com/home)などではHTTP/2が用いられていたので、Hostは指定されていなかった。


<img width="1436" alt="スクリーンショット 2024-06-09 18 29 47" src="https://github.com/UR-deR/PrAha_Challenge/assets/76472239/fdd64ed5-4e80-45f6-a98a-cd486274b18c">




阿部寛のwebサイトではHTTP/1.1が利用されており、以下のリクエストヘッダは[トップページ](http://abehiroshi.la.coocan.jp/)のHTMLを取得するリクエストのものである。Hostヘッダが指定されていた。（ポート番号の指定が無いかつhttpなので、ポート番号は暗に443が指定される）

<img width="1440" alt="スクリーンショット 2024-06-09 18 26 39" src="https://github.com/UR-deR/PrAha_Challenge/assets/76472239/f233e510-683d-4eec-bcc6-10da73845365">



### 2. Content-type

リクエストヘッダの`Content-type`は、リクエスト送信時におけるあらゆるエンコーディングが行われる前のリソースのmedia typeを指定するためのものである。

レスポンスヘッダの`Content-type`は、返されたコンテンツの実際のコンテンツの種別を指し示す。

```http
Content-Type: text/html; charset=utf-8
Content-Type: multipart/form-data; boundary=something
```

上記の例の通り、Content-typeは
- media-type
- charset
- boundary

から構成される。  

### 3. User-Agent

リクエストヘッダの`User-Agent`は、サーバーやネットワークなどに、リクエストしているユーザーエージェントのアプリケーション、オペレーティングシステム、ベンダー、バージョンを識別させるためのものである。

```http
User-Agent: <product> / <product-version> <comment>
```

**Google Chrome**

```http
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36
```

**Safari**

```http
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Safari/605.1.15
```

**Firefox**

```http
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
```
### 4. Accept

リクエストヘッダの`Accept`は、エージェントが処理することを望むメディアリソースの MIME タイプを羅列する。これはカンマ区切りの MIME タイプのリストで、それぞれの MIME タイプは、別の MIME タイプとの相対的な優先度を示す引数である品質係数と結びつけられている。

```http
Accept: <MIME_type>/<MIME_subtype>
Accept: <MIME_type>/*
Accept: */*

// Multiple types, weighted with the quality value syntax:
Accept: text/html, application/xhtml+xml, application/xml;q=0.9, image/webp, */*;q=0.8
```

```http
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
```

### 5. Referer

リクエストヘッダの`Referer`には、現在リクエストされているページへのリンク先を持った直前のウェブページのアドレスが含まれる。

```http
referer: https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Proxy-Authorization
```

### 6. Accept-Encoding

リクエストヘッダの`Accept-Encoding`は、クライアントが理解することができるコンテンツのエンコーディングを示す。

```http
Accept-Encoding: gzip, deflate, br, zstd
```

サーバーサイドは、リクエストヘッダの`Accept-Encoding`の中の値のうちの一つを選択して、レスポンスヘッダの`Content-Encoding`の値として返す。

```http
Content-Encoding:br
```

### 7. Authorization

リクエストヘッダの`Authorization`は、HTTPリクエストにおいてクライアントがサーバーに対して自身の認証情報を提供するためのヘッダである。
このヘッダを使用することで、サーバーはクライアントが誰であるかを確認し、適切なリソースへのアクセスを許可または拒否をする。

Basic認証: ユーザー名とパスワードをBase64でエンコードして提供する。

```http
Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
```

Bearerトークン: OAuthなどの認証フレームワークで使用されるトークンを提供する。

```http
Authorization: Bearer {token}
```

APIキー: 特定のAPIキーを提供する。

```http
Authorization: ApiKey {api_key}
```

### 8. Location

レスポンスヘッダの`Location`はリダイレクト先のURLを示す。
3xx (リダイレクト) または 201 (created) ステータスレスポンスを返すときのみ意味を成す。

```http
Location: /index.html
```

### target="_blank"　の時、 rel=noreferrerの設定が必要な理由

**セキュリティリスク**

新しいタブやウィンドウが、リンク元のページのwindowオブジェクトにアクセスできるようになる。　　
これにより、リンク先のページがリンク元のページを操作したり、悪意のあるスクリプトを実行することが可能になる。

具体例
- フィッシング攻撃: リンク先のページがリンク元のページを装ってユーザーから情報を盗む
- クリックジャッキング: リンク元のページに透明なレイヤーを作成し、ユーザーが意図しない操作を行うよう誘導する

**プライバシーリスク**

リファラー情報がリンク先に送信されるため、リンク先のサイトがリンク元のページのURLを知ることができる。
これにより、

- プライバシーの侵害: リンク元のページのURLに個人情報や機密情報が含まれている場合、それがリンク先に漏洩する
- マーケティングやトラッキングの悪用: リンク先のサイトがリファラー情報を使ってユーザーの行動を追跡し、マーケティング活動に利用する可能性がある

などの問題が考えられる。

### 遷移先が同一オリジンの場合はrefererの情報全部送り、別オリジンの時はURLのオリジン情報だけをrefererとして送信したい

`Referrer-Policy`ヘッダの値として、[strict-origin-when-cross-origin](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Referrer-Policy#strict-origin-when-cross-origin)を指定する。（そもそも、`strict-origin-when-cross-origin`は既定値である）

### 課題2

問1

```http
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:121.0) Gecko/20100101 Firefox/121.0
```

どのwebブラウザからhttpリクエストを送信する時にも、User-Agentに`Mozilla/5.0`のような文字列が含まれる。
なぜこのような仕様になっているのでしょうか？


問2

レスポンスのステータスコードが201であり、レスポンスヘッダに`Location`ヘッダの値がセットされている時、一般的にLocationヘッダには何のURLが指定されているでしょうか？


問3

ユーザーがウェブサイトやサービスからログアウトした場合、ローカル(cookie, storage, cache, etc)に保存されているデータを削除したい場合がある。
サイトからのログアウトが正常に完了したことを確認するページ (https://example.com/logout など)を送信する際にどのヘッダーを追加することで、これを実現することができるでしょうか？

### 課題3

Twitterフォロー



<img width="650" alt="スクリーンショット 2024-06-13 20 47 04" src="https://github.com/UR-deR/PrAha_Challenge/assets/76472239/7c98c8e9-52d7-436e-992b-80c7ee675c35">



Twitterアンフォロー



<img width="702" alt="スクリーンショット 2024-06-13 20 48 09" src="https://github.com/UR-deR/PrAha_Challenge/assets/76472239/db7d39a8-7bd1-49de-bb08-e5a39afb9f33">


Shopify オーダーキャンセル

- [POST Cancel an order](https://shopify.dev/docs/api/admin-rest/2024-04/resources/order#post-orders-order-id-cancel)

Amazon　Wishlistから削除

<img width="892" alt="スクリーンショット 2024-06-20 20 33 11" src="https://github.com/UR-deR/PrAha_Challenge/assets/76472239/58de3275-1b21-4142-b1fd-8496cbd1a086">



**参考**

- [What is the difference between POST and PUT in HTTP?](https://stackoverflow.com/questions/630453/what-is-the-difference-between-post-and-put-in-http)
- [Shopify REST API](https://shopify.dev/docs/api/admin-rest/2024-04/resources/customer)


