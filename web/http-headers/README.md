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

