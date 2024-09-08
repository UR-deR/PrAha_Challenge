# CI環境を整備してみよう

## 課題1

[Workflow runs · UR-deR/praha-github-actions-hands-on](https://github.com/UR-deR/praha-github-actions-hands-on/actions)

## 課題2

[setup ci environment by UR-deR · Pull Request #1 · UR-deR/praha-challenge-ddd-template](https://github.com/UR-deR/praha-challenge-ddd-template/pull/1)

## 課題3

**ビルド時間の短縮**

- [actions/cache: Cache dependencies and build outputs in GitHub Actions](https://github.com/actions/cache)を用いて、依存関係やビルド成果物をキャッシュできる。

```yml
      # node_modules がキャッシュされていれば展開する
      - name: Cache node modules
        id: cache-npm
        uses: actions/cache@v4
        env:
          cache-name: cache-node-modules
        with:
          path: node_modules
          key: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}
          restore-keys: ${{ runner.os }}-build-${{ env.cache-name }}-${{ hashFiles('**/package-lock.json') }}

      # node_modules がキャッシュされてなければ npm ci
      - if: ${{ steps.cache-npm.outputs.cache-hit != 'true' }}
        name: node
        uses: actions/setup-node@v4
        with:
          node-version: '16'

      - if: ${{ steps.cache-npm.outputs.cache-hit != 'true' }}
        name: npm install
        run: npm ci
```


- [依存関係をキャッシュしてワークフローのスピードを上げる - GitHub Docs](https://docs.github.com/ja/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows)
- [npm ciのキャッシュ方式の検討](https://r7kamura.com/articles/2023-12-15-npm-cache)


**特定のディレクトリ配下の変更のみをトリガーにする**

`paths`キーワードを用いる。
下記の例では、`/terraform/*`に変更が含まれるPRの場合のみ実行される。

```yml
on:
  pull_request:
    types: [ opened, synchronize, reopened ]
    paths:
      - terraform/**
```

**特定のjobの完了を待つ**

`jobs.<job_id>.needs`キーワードを用いる。
下記の例では、`apply-terraform`と`migrate-database`のjobが完了した後に`deploy-backend`jobが実行される。

```yml
jobs:
  apply-terraform:
    # terraform applyのjob定義
  migrate-database:
    # databaseのmigrationのjob定義
  deploy-backend:
    runs-on: ubuntu-latest
    needs:
      - apply-terraform
      - migrate-database
```

[ワークフローでジョブを使用する - GitHub Docs](https://docs.github.com/ja/actions/writing-workflows/choosing-what-your-workflow-does/using-jobs-in-a-workflow)

**秘匿性の高い値をどう扱うか**

Githubのsecretsに保存して、workflowのymlファイルからは　`${{ secrets.AWS_ACCESS_KEY_ID }}`のような記法で参照する。

[Using secrets in GitHub Actions - GitHub Docs](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)
