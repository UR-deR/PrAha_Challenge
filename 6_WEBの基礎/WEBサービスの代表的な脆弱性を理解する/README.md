# WEBサービスの代表的な脆弱性を理解する

## 課題1

### XSS

**脆弱性の仕組み**

XSSは、信頼できるウェブサイトに悪意のあるスクリプトが埋め込まれる脆弱性である。攻撃者は、ユーザーが入力するデータ（コメント欄、フォームなど）にスクリプトを挿入し、そのデータが適切にサニタイズされずに表示される場合に攻撃が成功する。ブラウザはそのスクリプトをユーザーのセッション内で実行し、個人情報を盗むことができる。

**発生し得る被害** 

XSS攻撃により、ユーザーのセッションID、クッキー、個人情報が盗まれ、不正な操作が行われる可能性がある。これにより、フィッシング詐欺やアカウント乗っ取りが発生する可能性がある。

**対処法** 

入力されたデータを適切にエスケープし、サニタイズすることが重要である。また、Content Security Policyの設定や、HTTPOnlyフラグ付きクッキーを使用することで、攻撃の影響を軽減できる。

### コマンドインジェクション

**脆弱性の仕組み**

コマンドインジェクションは、アプリケーションがシステムコマンドを実行する際に、外部から提供されるデータが適切に処理されずに直接組み込まれることで発生する脆弱性である。攻撃者は、意図しないコマンドを実行させることで、システムに対して不正な操作を行うことができる。

**発生し得る被害** 

攻撃者はシステム上で任意のコマンドを実行することができ、ファイルの削除、情報の漏洩、サーバの乗っ取りなど、重大な被害を引き起こす可能性がある。

**対処法** 

ユーザーからの入力を直接シェルコマンドに渡さないようにすることが重要である。必要な場合は、入力のサニタイズや、コマンドの実行に関してプリペアドステートメントやエスケープ処理を行い、または外部のコマンド呼び出しを避け、プログラム内部で処理するようにする。

### SQLインジェクション

**脆弱性の仕組み**

SQLインジェクションは、アプリケーションがSQLクエリを生成する際に、ユーザー入力が適切にサニタイズされずに直接組み込まれることで発生する脆弱性である。攻撃者は、データベースへの不正なクエリを挿入し、データの閲覧、改ざん、削除などを行うことができる。

**発生し得る被害** 

攻撃者は、データベース内の機密情報を不正に取得したり、データを改ざんしたりすることができる。場合によっては、システムの完全な制御を奪われる可能性もある。

**対処法** プリペアドステートメントやパラメータ化されたクエリを使用し、入力データを直接SQLクエリに挿入しないようにする。また、ユーザー入力をエスケープ処理し、データベースのエラー情報が直接ユーザーに表示されないようにする。

### CSRF

**脆弱性の仕組み**

CSRFは、ユーザーが意図しないリクエストを、認証済みのセッションで実行させる脆弱性である。攻撃者は、ユーザーが知らない間に攻撃用サイトに誘導し、そこから悪意のあるリクエストを送信させる。これにより、ユーザーが意図していない操作が、正規のユーザーの権限で実行されてしまう。

**発生し得る被害** 

攻撃者は、ユーザーのアカウントで不正な取引を行ったり、設定を変更したり、重要なデータを削除するなど、ユーザーの意図に反する操作を実行させることができる。

**対処法** 

CSRFトークンをフォームに埋め込み、リクエストごとに確認することで、正当なリクエストを識別する。また、同一生成元ポリシーを遵守し、セッション管理を適切に行うことも重要である。


### メールアドレスの正規表現によるテスト

メールアドレスの正規表現は非常に複雑であり、特にRFCに準拠した完全な正規表現を採用すると、かなり長くなる。このような複雑な正規表現をエンジンで処理すると計算コストが高くサーバーへの負荷が増加する。さらに、入力データが予想外に長い場合や、悪意を持ったデータが送信されると、エンジンが時間をかけすぎる場合がある。

以下のような工程を挟むことで、メールアドレスの入力を段階的に、かつ効率的に検証することが可能となる。単純なチェックを先に行うことで、不適切な入力を早期に除外し、正規表現エンジンの負荷を軽減します。

**入力制限**

メールアドレスの検証を行う前に、入力サイズを制限し、予想外に長いデータが処理されないようにする。（@の前で最大64文字、@の後ろで最大254文字、全体で254文字）

**単純なチェック**

正規表現を使う前に、単純な形式チェックや、メールアドレスのドメイン部分を分割して検証することで、負荷を軽減する。(`@`の数、`.`があるかなど)

**最適化**

使用する正規表現が最適化されているか確認し、可能な限りバックトラッキングを避ける。

## 課題2

### クイズ1

次のうち、CSPヘッダーの`connect-src`ディレクティブの目的として正しいものはどれですか？

1. スクリプトの外部読み込みを制限する 
2. スクリプトが接続する外部リソースを制限する
3. 画像の読み込みを制限する
4. スタイルシートの読み込みを制限する

<summary>
答え:
<details>
「2. スクリプトが接続する外部リソースを制限する」

fetchやXMLHttpRequestなどのAPIを使用して読み込むことができるURLを制限する。


参考: [CSP: connect-src - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Security-Policy/connect-src)
</details>
</summery>

### クイズ2

CSPヘッダーの`script-src`ディレクティブの目的は何か？

<summary>
答え:
<details>
ウェブページにおいてどのソースからスクリプトを読み込むことができるかを制限する。これにより、スクリプトの悪意のある挿入やXSS攻撃を防ぐことができる。

参考: [CSP: script-src - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)
</details>
</summery>


### クイズ3

CSPヘッダーの`script-src`ディレクティブに`nonce-abc123`が設定されている場合、読み込みが許可されるスクリプトの条件は何ですか？ 

<summary>
答え:
<details>
 script-srcディレクティブに`nonce-abc123`が設定されている場合、scriptタグにnonce="abc123"が設定されたスクリプトのみが許可されます。

 すべてのインラインスクリプトを許可することは、セキュリティ上のリスクがあると考えられるので、nonce-source でインラインスクリプトを許可するには、ランダムな値を生成して、それをポリシーに含める必要があります。

参考: [CSP: script-src - HTTP | MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Headers/Content-Security-Policy/script-src)
</details>
</summery>

## 課題3

### コマンドインジェクション

<img width="1319" alt="スクリーンショット 2024-08-25 19 54 34" src="https://github.com/user-attachments/assets/b7942a10-e9f6-4b5b-950f-50e3b82d970b">

### SQLインジェクション

<img width="1199" alt="スクリーンショット 2024-08-25 19 58 03" src="https://github.com/user-attachments/assets/fd81fd6e-cf41-4164-9508-f96da87461ec">

### CSRF

攻撃者のサイトに以下のようなスクリプトを仕込めば、DVWAのパスワードが変更できてしまう

```js
<script>
location.href="http://【DVWAのFQDN】/vulnerabilities/csrf/?password_new=【変更後のパスワード】&password_conf=【変更後のパスワード】&Change=Change#";
</script>
```

### DOM Based Cross Site Scripting (XSS)

"English"を選択しSubmitすると、URLが`http://localhost/vulnerabilities/xss_d/?default=English`に変わる。
次のような実装になっていた。

```js
if (document.location.href.indexOf("default=") >= 0) {
    var lang = document.location.href.substring(document.location.href.indexOf("default=")+8);
    document.write("<option value='" + lang + "'>" + decodeURI(lang) + "</option>");
    document.write("<option value='' disabled='disabled'>----</option>");
}
    
document.write("<option value='English'>English</option>");
document.write("<option value='French'>French</option>");
document.write("<option value='Spanish'>Spanish</option>");
document.write("<option value='German'>German</option>");
```

よって、`http://localhost/vulnerabilities/xss_d/?default=<script>alert(1)</script>`のようにすれば、任意のスクリプトを実行できてしまう。

<img width="1159" alt="スクリーンショット 2024-09-01 19 43 36" src="https://github.com/user-attachments/assets/c4249a9c-590b-4799-9fb1-55359f9ed7ff">

