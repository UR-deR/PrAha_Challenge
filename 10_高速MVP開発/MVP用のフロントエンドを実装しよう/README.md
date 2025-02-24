# MVP用のフロントエンドを実装しよう
## 課題1
[PrAha_Challenge/10_高速MVP開発/MVP用のフロントエンドを実装しよう/todo-app at main · UR-deR/PrAha_Challenge](https://github.com/UR-deR/PrAha_Challenge/tree/main/10_%E9%AB%98%E9%80%9FMVP%E9%96%8B%E7%99%BA/MVP%E7%94%A8%E3%81%AE%E3%83%95%E3%83%AD%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%83%89%E3%82%92%E5%AE%9F%E8%A3%85%E3%81%97%E3%82%88%E3%81%86/todo-app)

## 課題2

`npx create-next-app@latest`のオプション

```sh
What is your project named?  my-app
Would you like to use TypeScript?  No / Yes
Would you like to use ESLint?  No / Yes
Would you like to use Tailwind CSS?  No / Yes
Would you like your code inside a `src/` directory?  No / Yes
Would you like to use App Router? (recommended)  No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)?  No / Yes
```

上記の質問の意味を理解していないと、以下のような問題に直面する
- 使用するライブラリが意図せず決まってしまう。（後から剥がすことは可能） 
- デプロイ先としてAWS ECSを考えているが、App Routerを採用し期待通りの動作をしない可能性に直面する（？）

デプロイ先としてAWS ECSのようなコンテナ環境を想定している場合は、Dockerfileなどを別途用意する必要がある。

参考: [Next.js Custom Server を Docker コンテナとして本番環境デプロイする #Docker - Qiita](https://qiita.com/mikankari/items/3591c5ab7d9638bb2531)

MUIなどのコンポーネントライブラリを採用する場合のデメリットとしては以下のものが考えられる。
- スタイルの細かい調整が難しい
    - コンポーネントのプロパティとして設定可能な部分は限定的
    - 設定不可能な部分を無理に調整しようとする場合、実装の詳細を覗き込んで、cssを書く必要がある。（devtool開いて、実装詳細を解読しないといけないため大変）
    - ライブラリーのバージョンを上げて、実装の詳細に変更があった際にUIが崩れる可能性がある。

- デザインの幅がコンポーネントライブラリに依存する
    - コンポーネントライブラリは、ある程度整ったUIを提供してくれるものの、デザインのコンセプトや動作感などの調整が難しい。
    - プロダクトのデザインに即したコンポーネントライブラリがあれば、活用を検討しても良いが、プロダクトのデザインを刷新したい場合に、コンポーネントライブラリを剥がす必要が生じるかもしれない。
    - そのような意味合いで、変更容易性は高くない

### Shadcn/uiの採用

- カスタマイズ性に優れている
- TailwindCSSとの相性が良い。TailwindCSSのクラスを独自に付与することが可能。
- コピーした時点で自分のコードとなるので、shadcnのバージョンを気にする必要がない（アップデートの影響を受けない）。
