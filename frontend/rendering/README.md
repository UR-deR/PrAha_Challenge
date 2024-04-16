# フロントエンドのレンダリングパターンを学ぶ

## 課題 1

| 特徴 / レンダリングパターン | CSR                                                                                                                                                                                            | SSR                                                                  | SSG                                               |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------- |
| データの取得タイミング      | クライアントサイドの fetch 処理が呼び出された時                                                                                                                                                | データ取得が必要なコンポーネントをサーバーサイドでレンダリングする時 | JavaScript ファイルをビルドする時                 |
| レンダリングのタイミング    | クライアントサイドの JavaScript が任意の UI コンポーネントを呼び出した時                                                                                                                       | サーバーにリクエストが来た時に、サーバーサイドでレンダリングを行う。 | JavaScript ファイルをビルドする時                 |
| SEO                         | クライアントサイドに JavaScript ファイルが読み込まれた後に HTML をレンダリングするため、検索エンジンがページ内容を正しく認識できない。よって、検索エンジンにインデックスされない可能性がある。 | サーバーサイドで HTML を生成するため、SEO への悪影響無し             | ビルド時に HTML を生成するため SEO への悪影響無し |

refs

- [SEO で評価されるための CSR・非同期読み込み YES/NO チャート【JavaScript SEO】](https://ld-note.a-tm.co.jp/n/n28014f0daaea#12158717-9775-42cf-9d7c-a0ae873dbd18)

---

## 課題 2

CSR:

SSR:

SSG:

**SSR と SSG の Build 成果物の違い**

```bash
❯ npm run build

> next.js@0.1.0 build
> next build

   ▲ Next.js 14.1.0

 ✓ Linting and checking validity of types
   Creating an optimized production build ...
 ✓ Compiled successfully
 ✓ Collecting page data
 ✓ Generating static pages (6/6)
 ✓ Collecting build traces
 ✓ Finalizing page optimization

Route (pages)                             Size     First Load JS
┌ ○ /                                     4.97 kB        82.9 kB
├   └ css/f5325c19304b8c74.css            1.66 kB
├   /_app                                 0 B              78 kB
├ ○ /404                                  182 B          78.1 kB
├ λ /api/hello                            0 B              78 kB
├ ○ /csr                                  629 B          78.6 kB
├ ○ /ref-sample                           780 B          78.7 kB
├ ● /ssg (350 ms)                         474 B          78.4 kB
└ λ /ssr                                  474 B          78.4 kB
+ First Load JS shared by all             78.7 kB
  ├ chunks/framework-5429a50ba5373c56.js  45.2 kB
  ├ chunks/main-930135e47dff83e9.js       31.7 kB
  └ other shared chunks (total)           1.76 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses getStaticProps)
λ  (Dynamic)  server-rendered on demand using Node.js
```

**成果物**

CSR

- csr.html

SSR

- ssr.js

HTML ファイルが build 時に生成されない。

SSG

- ssg.html
- ssg.js

SSG では build 時に HTML を生成するため、HTML ファイルが生成される。
data fetching も build 時に行われるため、外部 API のレスポンスが js の script 内に埋め込まれている。

`ssg.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <meta name="next-head-count" content="2" />
    <link rel="preload" href="/_next/static/css/ea9fcf7782fb2a52.css" as="style" crossorigin="" />
    <link rel="stylesheet" href="/_next/static/css/ea9fcf7782fb2a52.css" crossorigin="" data-n-g="" />
    <noscript data-n-css=""></noscript>
    <script defer="" crossorigin="" nomodule="" src="/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js"></script>
    <script src="/_next/static/chunks/webpack-8fa1640cc84ba8fe.js" defer="" crossorigin=""></script>
    <script src="/_next/static/chunks/framework-5429a50ba5373c56.js" defer="" crossorigin=""></script>
    <script src="/_next/static/chunks/main-930135e47dff83e9.js" defer="" crossorigin=""></script>
    <script src="/_next/static/chunks/pages/_app-ee5b24ebcef07bef.js" defer="" crossorigin=""></script>
    <script src="/_next/static/chunks/pages/ssg-cde0a1b08ccf791d.js" defer="" crossorigin=""></script>
    <script src="/_next/static/kXp9twX9iblOpuJuO6-F8/_buildManifest.js" defer="" crossorigin=""></script>
    <script src="/_next/static/kXp9twX9iblOpuJuO6-F8/_ssgManifest.js" defer="" crossorigin=""></script>
  </head>
  <body>
    <div id="__next">
      <div style="background-color:purple;height:100vh">
        <h1>SSG</h1>
        <p>ここにGitHubレポジトリに付いたスターの数を表示してみよう</p>
        <p>
          1<!-- -->
          subscribers
        </p>
        <p>
          1<!-- -->
          stars
        </p>
      </div>
    </div>
    <script id="__NEXT_DATA__" type="application/json" crossorigin="">
      {
        "props": {
          "pageProps": {
            "repository": {
              "id": 524293702,
              "node_id": "R_kgDOH0AWRg",
              "name": "PrAha_Challenge",
              "keys_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/keys{/key_id}",
              "collaborators_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/collaborators{/collaborator}",
              "teams_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/teams",
              "hooks_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/hooks",
              "issue_events_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/issues/events{/number}",
              "events_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/events",
              "assignees_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/assignees{/user}",
              "branches_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/branches{/branch}",
              "tags_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/tags",
              "blobs_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/git/blobs{/sha}",
              "git_tags_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/git/tags{/sha}",
              "git_refs_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/git/refs{/sha}",
              "trees_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/git/trees{/sha}",
              "statuses_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/statuses/{sha}",
              "languages_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/languages",
              "stargazers_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/stargazers",
              "contributors_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/contributors",
              "subscribers_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/subscribers",
              "subscription_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/subscription",
              "commits_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/commits{/sha}",
              "git_commits_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/git/commits{/sha}",
              "comments_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/comments{/number}",
              "issue_comment_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/issues/comments{/number}",
              "contents_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/contents/{+path}",
              "compare_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/compare/{base}...{head}",
              "merges_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/merges",
              "archive_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/{archive_format}{/ref}",
              "downloads_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/downloads",
              "issues_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/issues{/number}",
              "pulls_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/pulls{/number}",
              "milestones_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/milestones{/number}",
              "notifications_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/notifications{?since,all,participating}",
              "labels_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/labels{/name}",
              "releases_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/releases{/id}",
              "deployments_url": "https://api.github.com/repos/UR-deR/PrAha_Challenge/deployments",
              "created_at": "2022-08-13T03:52:45Z",
              "updated_at": "2024-03-03T07:06:18Z",
              "pushed_at": "2024-04-15T14:27:49Z",
              "git_url": "git://github.com/UR-deR/PrAha_Challenge.git",
              "ssh_url": "git@github.com:UR-deR/PrAha_Challenge.git",
              "clone_url": "https://github.com/UR-deR/PrAha_Challenge.git",
              "svn_url": "https://github.com/UR-deR/PrAha_Challenge",
              "homepage": "https://praha-challenge.com/"
              <!-- 中略 -->
            }
          },
          "__N_SSG": true
        },
        "page": "/ssg",
        "query": {},
        "buildId": "kXp9twX9iblOpuJuO6-F8",
        "isFallback": false,
        "gsp": true,
        "scriptLoader": []
      }
    </script>
  </body>
</html>
```

## 課題 3

**週 1 回更新されるブログ**

→SSG

- 更新頻度が少ない
- 動的なコンテンツが少ない

**ユーザーのコメントが随時追加されるクックパッドのようなサービス**

→SSR

- SEO が重要なので、サーバー側でプリレンダリングさせたい
- コメント欄はすぐに反映されるようにするために CSR でも良いかも

**freee のような会計サービス**

→CSR

- SEO が重要でない
- 一部ページは SSG でも良いかも（利用規約など）

**経営指標（OKR や KPI など）を管理する社内サービス**

→CSR

- 社内向けサービスなので、SEO が重要でない

**社内 SNS**

→CSR

- SNS なので更新が頻繁
- 更新されたらすぐに画面に反映されて欲しい
