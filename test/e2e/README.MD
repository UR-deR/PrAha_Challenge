# e2eテストを書こう

## 課題 1

### 片方のプレイヤーが勝利&引き分け

[e2eテスト](https://github.com/axtx4869/react-tutorial/blob/master/cypress/e2e/game.cy.js)
[実装](https://github.com/axtx4869/react-tutorial/tree/master/src/components)

引き分けの時のsnapshot（右にスクロールしてください）

https://github.com/axtx4869/react-tutorial/blob/master/src/__image_snapshots__/__diff_output__/storybook-test-js-image-storyshots-q-2-game-index-1-diff.png

### presentational / containerパターン

データフェッチング層とプレゼンテーション層とで関心の分離を行うためのコンポーネントの設計パターン

**presentational**

どのようにデータを表示するのかに関心を持つ
ビューを担う

**container**

どのデータを表示するのかに対して関心を持つ
データフェッチングを担う

hooksが登場してから、presentational/containerコンポーネントパターンは廃れていった。
hooksを用いれば、containerコンポーネントでpresentationalコンポーネントをラップして、propsでデータを渡すなどの処理をかかなくても良くなり、コンポーネント内でhooksを呼び出すだけで良くなった

参考: [Container/Presentational Pattern](https://www.patterns.dev/posts/presentational-container-pattern/)

## 課題 2

### メリット

- ブラウザごとの動作確認が容易になる → 特定ブラウザ特有の問題を発見できる
- ブラウザの API をモックしなくても良い
- 詳細なテストケースを追加できるので、テストカバレッジが増える
- アプリケーション全ての依存関係が正しく連携しているか動作しているか確認できる

### デメリット

- 単体テストに比べて依存関係が多いので、テスト結果が安定しない
- 単体テストに比べて、実行時間を多く要する

### テスト手法の選定

**コスト**

ここで言うコストとは、CI 環境でテストを実行するための実際の費用や、エンジニアがテストをメンテナンスするのに要する時間と労力を指します。

単体 < 統合 < e2e

**実行速度**

単体 < 統合 < e2e

**より多くのエッジケースをカバーしたい**

e2e < 統合 < 単体

**要素の識別子に class を使う**

- スタイルだけを変更してファンクショナルな部分は変更していない場合でも、e2e 側のセレクターも修正する必要がある。
- css in js などのような、動的に class が生成されるライブラリを利用している場合、エディタ上ではどの要素がどの class を持っているのかが分からないため、e2e テストの可読性を損ねてしまう。

**要素の識別子に id を使う**

- id 属性の値が変更した時に e2e テストが失敗してしまう。

**要素の識別子に文言を使う**

- 文言が変更した時に e2e テストが失敗してしまう

**どのように指定すると良いか**

要素に data 属性を付与する。
特に、`data-testid`のようにテスト用の data 属性であることが読み取れるようにしておくと、細かいデザインの修正や画面の挙動の修正に影響されることが少なくなり、e2e テストが失敗しにくくなる。

## 課題 3

課題１とコードは同じです

## 課題 4

Q1. 水平方向の e2e テスト（Horizontal end-to-end testing）とはなんでしょうか？

Q2. 垂直方向の e2e テスト（Vertical end-to-end testing）とはなんでしょうか？

Q3. e2e テストはどのような性質を持つ機能や画面に対して実装すべきでしょうか？
