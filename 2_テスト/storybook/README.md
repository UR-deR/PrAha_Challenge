# storybook を作ろう

## 課題 1

[commit: React tutorial を完成させた](https://github.com/axtx4869/react-tutorial/commit/1cc23c4bc9c9240b5a2f749d4476bb4560256080)

## 課題 2

### Game

[Game.stories.jsx](https://github.com/axtx4869/react-tutorial/blob/4ab4fe6c46c311cf84260478eb9d3f9e91e97551/src/stories/Game.stories.jsx)

### Board

[Board.stories.jsx](https://github.com/axtx4869/react-tutorial/blob/4ab4fe6c46c311cf84260478eb9d3f9e91e97551/src/stories/Board.stories.jsx)

### Square

[Square.stories.jsx](https://github.com/axtx4869/react-tutorial/blob/4ab4fe6c46c311cf84260478eb9d3f9e91e97551/src/stories/Square.stories.jsx)

## 課題 3

### メリット

- コンポーネント単位で動作・見た目を確認できる。（私の現職では storybook を導入していないので、Atom のコンポーネント実装の Pull Request のレビュー依頼がきたら、その Atom のコンポーネントを Page コンポーネント内で呼び出して、ブラウザで確認するって感じでやってます、、、）

- Props として指定する値を Storybook 上で変更して、即座に見た目や振る舞いを確認できるので、開発者体験面で Good（コンパイルを待たなくていい）

- コンポーネントのカタログとして便利。後から参画したエンジニアが、実装済みのコンポーネントを確認する際に役立ちそう。デザイナーが確認する際にも便利そう。

### デメリット

- 保守する対象が増える（React コンポーネントの管理と Storybook の管理、でも Storybook に限った話ではない）

そのほか特に思い当たらなかったのですが、他のデメリット

> Weakness of Storybook  
> As every library it has its advantages, Storybook has some inconvenient, and here is a list of cons with it:
>
> - It doubles your work feels double in the case of maintaining the React components and the Storybook library.
> - If you’re integrating it into an existing project, there’s some migration work to be done.
> - Some add-ons are a bit buggy.
> - You rely on addons and decorators for handling data.

[Quick overview: Storybook with React](https://medium.com/edonec/quick-overview-storybook-with-react-439e1ccce5a7)

## 課題 4

**Q1. 環境変数を Storybook 上で扱うにはどのようにしたらよいでしょうか？(e.g. `API_KEY`という環境変数がある場合、この環境変数は Node.js 環境でしか利用できません。Storybook 上で扱うにはどのようにするでしょうか)**

**Q2. コードが storybook 上 で実行されていることを確認するためにはどうすればよいでしょうか？**

**Q3.story の外部（リモートの API など）からデータを取得し、story に注入するにはどうすれば良いでしょうか？**

```js
import React from 'react';
import fetch from 'node-fetch';
import { TodoItem } from './TodoItem';

export default {
  title: 'Examples/Loader'
  component: TodoItem,
};

export const Primary = (args, { loaded: { todo } }) => <TodoItem {...args} {...todo} />;
/**
 * 例えば以下のエンドポイントからデータを取得して、Primaryに注入する場合
 * https://jsonplaceholder.typicode.com/todos/1
 * /

```
