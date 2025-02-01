# Dockerで環境差分を吸収する
## 課題1

### Dockerとは

Dockerとは、アプリケーションを動作させる環境を簡単に作成・配布・実行できる「コンテナ型仮想化技術」である。  

従来の仮想マシンは、OSごと仮想化するため動作が重くなりがちでした。一方、DockerはホストOS上で軽量な「コンテナ」として動作するため、起動が速く、リソースを効率的に使える。  

Dockerの主な特徴は以下の通り。  

1. 環境の統一  
開発者のPC、テスト環境、本番環境で同じ環境を再現できるため、「開発環境では動くのに本番では動かない」といった問題を防げる。

2. 軽量で高速  
コンテナはOSを共有するため、仮想マシンよりも軽量で、起動や停止が高速である。

3. 簡単な管理  
アプリケーションの実行環境を「Dockerイメージ」として保存し、どこでも同じ環境を再現できる。

4. 拡張性と移植性  
クラウドやオンプレミス環境でも同じように動作するため、スケールしやすい。  

### Dockerイメージ

Dockerコンテナを作成する命令が入った読み込み専用のテンプレート。  
イメージは自分で作ることも可能だが、他の人が作ってレジストリに公開しているイメージを使うことも可能。  
イメージを自分で作る場合は、Dockerfileを用意し、そこにイメージを生成して実行するまでの手順を定義する。  
Dockerfile内の個々の命令ごとに、イメージ内にレイヤーが生成される。  
Dockerfileの内容を書き換えてイメージを再構築する場合は、変更があったレイヤーのみが再作成される。

```sh
docker build -t イメージ名:タグ .
```

例

```sh
docker build -t my-app:latest .
```

- `-t my-app:latest` は、作成するイメージの名前（`my-app`）とタグ（`latest`）を指定
- タグを省略すると、デフォルトで `latest` になる。
- `.` は、Dockerfile があるディレクトリを指定（カレントディレクトリ）

### Dockerコンテナ

イメージが実行状態となったインスタンスのこと。  
コンテナに対する生成、開始、停止、移動、削除は Docker API や CLI を使って行われる。

**生成**

```sh
docker create --name コンテナ名 イメージ名

docker create --name my-container my-app:latest
```

**開始**

```sh
docker start コンテナ名

docker start my-container
```

**停止**

```sh
docker stop コンテナ名

docker stop my-container
```

**移動（rename）**

```sh
docker rename 旧コンテナ名 新コンテナ名

docker rename my-container renamed-container
```

**削除**

`-f`で起動中のコンテナを強制削除できる。

```sh
docker rm コンテナ名

docker rm my-container

docker rm -f my-container
```

**Docker runコマンド**

```sh
docker run -i -t ubuntu /bin/bash
```

このコマンドを実行すると、

1. ubuntu イメージを元に新しいコンテナを作成する。
1. そのコンテナ内で /bin/bash（Bashシェル）を実行する。
1. ターミナル上でコンテナのシェルに入ることができる（対話モード）。
1. Ctrl + D または exit を入力するまで、コンテナは実行され続ける。

`-i`: 標準入力を開いたままにし、コンテナ内で対話的な操作ができるようにする。
`-t`: 疑似端末（TTY）を割り当て、コンテナ内のシェルをターミナルとして使用できるようにする。

コンテナは、複数のネットワークへの接続が可能。

1. ネットワークを作成
```sh
docker network create network1
docker network create network2
```

2. コンテナを作成するときに、1つ目のネットワークを指定する。  
例: `my-container` を `network1` に接続して起動

```sh
docker run -dit --name my-container --network network1 alpine
```

3. すでに起動しているコンテナを、追加のネットワークに接続する。  
例: `my-container` を `network2` にも接続

```sh
docker network connect network2 my-container
```

bridge ネットワークに接続されているコンテナ同士は、デフォルトで通信可能。  
異なるネットワークに属するコンテナ間は直接通信できないが、コンテナを複数のネットワークに接続することで間接的に通信できる。

現時点の状態にもとづいた新たなイメージを生成することもできる。    
通常、Dockerイメージからコンテナを作成し、コンテナ内でアプリケーションを実行したり、設定を変更したりする。  
しかし、そのコンテナに対して変更を加えた後、それを新しいイメージとして保存できる。(コンテナ内でアプリケーションの設定を変更したり、新しいパッケージをインストールしたりなど)

```sh
docker commit コンテナ名 新しいイメージ名:タグ

docker commit my-container my-new-image:latest
```

※ ただし、この方法はDockerfileによるビルドではなく手動での変更を反映する手法なので、運用管理の観点からはDockerfileの使用が推奨される。

### ベースイメージ

Dockerコンテナを構築する際の出発点となるイメージのこと。  
Dockerfileの FROM 指定で最初に指定するイメージを指す。  

ベースイメージには、大きく分けて2種類がある。  
1. ディストリビューション系ベースイメージ  
OS（Linuxディストリビューション）を基にしたイメージ。  
これらのイメージは、基本的なパッケージマネージャー（apt や yum）が利用可能で、カスタマイズしやすい。

- ubuntu（Ubuntuベース）
- debian（Debianベース）
- alpine（軽量Linuxベース）
- centos（CentOSベース）

2. ミニマルなベースイメージ  
最小限の環境のみを提供する軽量なイメージ。  

- scratch（完全に空のイメージ, 最小限のバイナリだけで動作するコンテナを作成可能）
- busybox（軽量なUNIXユーティリティ）
- alpine（5MB程度の最小Linux）

### Dockerレジストリ

Docker レジストリは Docker イメージを保管する。  
Docker Hub は公開レジストリであり、誰でも利用可能。  
また Docker はデフォルトで Docker Hub のイメージを探すよう設定されている。  
独自にプライベート・レジストリを運用することも可能。  
`docker pull` や `docker run` コマンドを使うと、設定されたレジストリから必要なイメージを取得する。  
`docker push` コマンドを使えば、イメージを指定したレジストリに送信する。

### ビルドコンテキスト

`docker build`コマンドを実行するときに、Dockerデーモンに送信されるファイルやディレクトリの範囲のこと。  
通常、Dockerfileが配置されているディレクトリをビルドコンテキストとして指定する。


`docker build` コマンドの最後の引数でビルドコンテキストを指定する。

```sh
docker build -t my-app .
```

- 上記の例では`.`（カレントディレクトリ）をビルドコンテキストとして指定。  
- このディレクトリ内のすべてのファイルがDockerデーモンに送信される。

```sh
docker build -t my-app /path/to/context
```
- 上記の例では、`/path/to/context` ディレクトリがビルドコンテキストとなる。
- Dockerfile 内で `COPY somefile /app`/ を指定すると、`/path/to/context/somefile` がコンテナにコピーされる。

Dockerfile内で、`COPY`や`ADD`で使用できるのは、ビルドコンテキスト内のファイルのみ。  
`docker build` 実行時、ビルドコンテキスト内のすべてのファイルがDockerデーモンに送信されるため、不要なファイルが多いとビルドが遅くなる。  
`.dockerignore`を使うと、不要なファイルを除外でき、ビルド時間を短縮できる。

### マルチステージビルド

Dockerfileの中で複数の段階（ステージ）を使ってイメージを構築する手法。  
構築時の依存関係と、実行時の依存関係を分離できる。    
アプリケーションが実行に必要なもの「だけ」送るので、イメージ全体の容量を削減できる。    
不要なツールが含まれると、イメージサイズが大きくなり、セキュリティリスクも増える。  
→ マルチステージビルドによって、不要なツールを含まないようにできる。

```
# syntax=docker/dockerfile:1
FROM maven AS build
WORKDIR /app
COPY . .
RUN mvn package

FROM tomcat
COPY --from=build /app/target/file.war /usr/local/tomcat/webapps
```
JDKやMavenは最終イメージでは不要。

### Dockerfileを用いた環境構築のコード化の利点

1. 環境の統一性（開発・本番環境の差異をなくす）
    - Dockerfileを使えば、開発環境・テスト環境・本番環境を同じ構成で再現できる。
1. 再現性の確保    
    - コード一つで誰でも同じ環境を構築できるため、新規開発者のセットアップが容易。
    - 「動作する環境が人によって違う」問題を解決できる。
    - OSやミドルウェアの設定ミスを防ぎ、一貫した環境を保証できる。
1. デプロイが容易
    - Dockerイメージを作成すれば、どこでも同じ環境をデプロイ可能。
    - GitHub Actions で `docker build` & `docker push` することで、自動デプロイ可能。

### docker composeはどのような場面で役立つか

docker compose を使うと、1つのYAMLファイルで複数のコンテナを定義し、一括で起動・停止できる。  

**例: Node.js + MySQL の構成**

```yaml
services:
  app:
    image: node:20-alpine
    ports:
      - "3000:3000"
    depends_on:
      - mysql
  mysql:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: app_db
```
→ docker compose up を実行するだけで、Node.jsアプリとMySQLが自動的に起動・連携 する。

### .dockerignore
`.dockerignore` は、Dockerのビルドコンテキストに含めたくないファイルやディレクトリを指定するためのファイル。  
例えば、ホスタ端末に依存するファイルや、IDEの設定ファイルなど。
