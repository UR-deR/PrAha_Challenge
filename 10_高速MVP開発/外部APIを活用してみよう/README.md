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

## 課題2

### issueの一覧を取得する。

```sh
❯ npm run list-issues --owner UR-deR --repo github-api-for-praha

> my-cli-app@1.0.0 list-issues
> node --env-file=.env ./src/list-issues.js UR-deR github-api-for-praha

[
  {
    url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/2',
    repository_url: 'https://api.github.com/repos/UR-deR/github-api-for-praha',
    labels_url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/2/labels{/name}',
    comments_url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/2/comments',
    events_url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/2/events',
    html_url: 'https://github.com/UR-deR/github-api-for-praha/issues/2',
    id: 2825664219,
    node_id: 'I_kwDONzEp786obDbb',
    number: 2,
    title: 'issue2',
    user: {
      login: 'UR-deR',
      id: 76472239,
      node_id: 'MDQ6VXNlcjc2NDcyMjM5',
      avatar_url: 'https://avatars.githubusercontent.com/u/76472239?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/UR-deR',
      html_url: 'https://github.com/UR-deR',
      followers_url: 'https://api.github.com/users/UR-deR/followers',
      following_url: 'https://api.github.com/users/UR-deR/following{/other_user}',
      gists_url: 'https://api.github.com/users/UR-deR/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/UR-deR/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/UR-deR/subscriptions',
      organizations_url: 'https://api.github.com/users/UR-deR/orgs',
      repos_url: 'https://api.github.com/users/UR-deR/repos',
      events_url: 'https://api.github.com/users/UR-deR/events{/privacy}',
      received_events_url: 'https://api.github.com/users/UR-deR/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false
    },
    labels: [],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: '2025-02-02T07:48:40Z',
    updated_at: '2025-02-02T07:48:40Z',
    closed_at: null,
    author_association: 'OWNER',
    sub_issues_summary: { total: 0, completed: 0, percent_completed: 0 },
    active_lock_reason: null,
    body: null,
    closed_by: null,
    reactions: {
      url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/2/reactions',
      total_count: 0,
      '+1': 0,
      '-1': 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      heart: 0,
      rocket: 0,
      eyes: 0
    },
    timeline_url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/2/timeline',
    performed_via_github_app: null,
    state_reason: null
  },
  {
    url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/1',
    repository_url: 'https://api.github.com/repos/UR-deR/github-api-for-praha',
    labels_url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/1/labels{/name}',
    comments_url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/1/comments',
    events_url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/1/events',
    html_url: 'https://github.com/UR-deR/github-api-for-praha/issues/1',
    id: 2825664198,
    node_id: 'I_kwDONzEp786obDbG',
    number: 1,
    title: 'issue1',
    user: {
      login: 'UR-deR',
      id: 76472239,
      node_id: 'MDQ6VXNlcjc2NDcyMjM5',
      avatar_url: 'https://avatars.githubusercontent.com/u/76472239?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/UR-deR',
      html_url: 'https://github.com/UR-deR',
      followers_url: 'https://api.github.com/users/UR-deR/followers',
      following_url: 'https://api.github.com/users/UR-deR/following{/other_user}',
      gists_url: 'https://api.github.com/users/UR-deR/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/UR-deR/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/UR-deR/subscriptions',
      organizations_url: 'https://api.github.com/users/UR-deR/orgs',
      repos_url: 'https://api.github.com/users/UR-deR/repos',
      events_url: 'https://api.github.com/users/UR-deR/events{/privacy}',
      received_events_url: 'https://api.github.com/users/UR-deR/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false
    },
    labels: [],
    state: 'open',
    locked: false,
    assignee: null,
    assignees: [],
    milestone: null,
    comments: 0,
    created_at: '2025-02-02T07:48:33Z',
    updated_at: '2025-02-02T07:48:33Z',
    closed_at: null,
    author_association: 'OWNER',
    sub_issues_summary: { total: 0, completed: 0, percent_completed: 0 },
    active_lock_reason: null,
    body: null,
    closed_by: null,
    reactions: {
      url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/1/reactions',
      total_count: 0,
      '+1': 0,
      '-1': 0,
      laugh: 0,
      hooray: 0,
      confused: 0,
      heart: 0,
      rocket: 0,
      eyes: 0
    },
    timeline_url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/1/timeline',
    performed_via_github_app: null,
    state_reason: null
  }
]
```

### issueにコメントする

```sh
❯ npm run comment-on-issue --owner UR-deR --repo github-api-for-praha --issue-number 1 --comment hogehoge

> my-cli-app@1.0.0 comment-on-issue
> node --env-file=.env ./src/comment-on-issue.js UR-deR github-api-for-praha 1 hogehoge

{
  url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/comments/2629296520',
  html_url: 'https://github.com/UR-deR/github-api-for-praha/issues/1#issuecomment-2629296520',
  issue_url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/1',
  id: 2629296520,
  node_id: 'IC_kwDONzEp786ct-GI',
  user: {
    login: 'praha-github-api[bot]',
    id: 197466221,
    node_id: 'BOT_kgDOC8UYbQ',
    avatar_url: 'https://avatars.githubusercontent.com/u/76472239?v=4',
    gravatar_id: '',
    url: 'https://api.github.com/users/praha-github-api%5Bbot%5D',
    html_url: 'https://github.com/apps/praha-github-api',
    followers_url: 'https://api.github.com/users/praha-github-api%5Bbot%5D/followers',
    following_url: 'https://api.github.com/users/praha-github-api%5Bbot%5D/following{/other_user}',
    gists_url: 'https://api.github.com/users/praha-github-api%5Bbot%5D/gists{/gist_id}',
    starred_url: 'https://api.github.com/users/praha-github-api%5Bbot%5D/starred{/owner}{/repo}',
    subscriptions_url: 'https://api.github.com/users/praha-github-api%5Bbot%5D/subscriptions',
    organizations_url: 'https://api.github.com/users/praha-github-api%5Bbot%5D/orgs',
    repos_url: 'https://api.github.com/users/praha-github-api%5Bbot%5D/repos',
    events_url: 'https://api.github.com/users/praha-github-api%5Bbot%5D/events{/privacy}',
    received_events_url: 'https://api.github.com/users/praha-github-api%5Bbot%5D/received_events',
    type: 'Bot',
    user_view_type: 'public',
    site_admin: false
  },
  created_at: '2025-02-02T08:27:02Z',
  updated_at: '2025-02-02T08:27:02Z',
  author_association: 'NONE',
  body: 'hogehoge',
  reactions: {
    url: 'https://api.github.com/repos/UR-deR/github-api-for-praha/issues/comments/2629296520/reactions',
    total_count: 0,
    '+1': 0,
    '-1': 0,
    laugh: 0,
    hooray: 0,
    confused: 0,
    heart: 0,
    rocket: 0,
    eyes: 0
  },
  performed_via_github_app: {
    id: 1130861,
    slug: 'praha-github-api',
    node_id: 'A_kwDOBI7fr84AEUFt',
    owner: {
      login: 'UR-deR',
      id: 76472239,
      node_id: 'MDQ6VXNlcjc2NDcyMjM5',
      avatar_url: 'https://avatars.githubusercontent.com/u/76472239?u=2cfcdf5d0719386805f223278ac00e7ada75dc5c&v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/UR-deR',
      html_url: 'https://github.com/UR-deR',
      followers_url: 'https://api.github.com/users/UR-deR/followers',
      following_url: 'https://api.github.com/users/UR-deR/following{/other_user}',
      gists_url: 'https://api.github.com/users/UR-deR/gists{/gist_id}',
      starred_url: 'https://api.github.com/users/UR-deR/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/UR-deR/subscriptions',
      organizations_url: 'https://api.github.com/users/UR-deR/orgs',
      repos_url: 'https://api.github.com/users/UR-deR/repos',
      events_url: 'https://api.github.com/users/UR-deR/events{/privacy}',
      received_events_url: 'https://api.github.com/users/UR-deR/received_events',
      type: 'User',
      user_view_type: 'public',
      site_admin: false
    },
    name: 'praha-github-api',
    description: '',
    external_url: 'https://brave-newton-5463d0.netlify.app/',
    html_url: 'https://github.com/apps/praha-github-api',
    created_at: '2025-02-02T07:55:38Z',
    updated_at: '2025-02-02T08:20:47Z',
    permissions: { issues: 'write', metadata: 'read' },
    events: []
  }
}
```
