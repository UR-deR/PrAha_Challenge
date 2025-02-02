# 外部APIを活用してみよう
## 課題1

### Personal Access Token(PAT)
プログラムからGithub APIを利用する場合や、コマンドラインからGithubにアクセスする時に、パスワードの代わりに用いる。  
必要な操作権限だけを設定することができるので、パスワードとユーザー名を直接利用するよりも安全。
Personal Access Tokenは、ユーザーに紐づき、発行したユーザーとして認証に利用できる。

**Classic**では、細かいスコープの制限が難しいが、**Fine-grained**では、特定のリポジトリやリソースに対し細かくスコープの制限がかけられるようになっている。

[きめ細かなアクセス権の制御ができる「Fine-grained personal access tokens (beta)」を使ってみた | DevelopersIO](https://dev.classmethod.jp/articles/github-fine-grained-personal-access-tokens/)


### OAuth apps, Github apps
OAuth 2.0を使用してOAuthトークンを生成し、トークンを用いてGithubのリソースにアクセスできるようになる。  
Github Appsは細かいアクセス権限設定ができるが、OAuth appsだと細かい権限設定ができない。  
（例えば、リポジトリのコードにアクセスさせる場合、Github appsではread/writeレベルで権限設定できるが、OAuth appsは`repo`スコープを用いるので、read/writeレベルでの権限設定ができない。）  

OAuth appsでは、権限付与が可能なユーザーによって、権限の変更がなされてしまったら、Organizationやリポジトリへのアクセスを失ってしまう可能性がある。また、アクセス権を失ってしまったとしても通知が無いため検知が難しい。　　
一方Github appsではinstallationが変更されたり削除されたりした時に、アプリの作成者に組織のリソースへのアクセス権の増減を知らせてくれる。

OAuth appのトークンは取り消しがなされるまで有効。（つまり、流出したら不正利用されまくる）  
Github appsのアクセストークンは、あらかじめ設定された時間（現在は1時間）が経過すると失効し、新しいトークンを手に入れるためのトークンを用いてトークンを再発行できる。

総じて考えると、OAuth appsよりもGithub appsを優先的に採用するのが吉。

--- 

- **GitHub Apps**は、リポジトリ・組織単位の権限管理が可能だが、エンタープライズ単位のアクセス管理ができない。
- **OAuth Apps**は、ユーザーの権限を通じてエンタープライズ全体のリソースにアクセスできる。
- エンタープライズ全体を対象にしたアプリケーションを作る場合、**OAuth Apps**のほうが適しているケースがある。
- ただし、エンタープライズ内の組織やリポジトリ単位で細かく権限を管理する場合は、**GitHub Apps**のほうが適している。

**例**
`example.com` というGitHub Enterpriseインスタンスがあり、その中に `org-a` と `org-b` の2つの組織があるとする。  
GitHub Appsは `org-a` にインストールされれば `org-a` のリソースにアクセスできるが、`org-b` にはアクセスできない（インストールが必要）。  
エンタープライズレベルで一括管理することができないため、大規模な企業環境では制約が生じる。
