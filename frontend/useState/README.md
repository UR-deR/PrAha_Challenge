## 課題 1

### フックのメリット

フックを用いることによって、ステートフルなロジックをコンポーネントの階層を変えることなく再利用できるようになる。

フックが登場する以前までは、以下のような問題が発生していた。

- render props や higher order component、provider, comsumer などの抽象化レイヤに囲まれたラッパー地獄になっていた。それゆえに、コンポーネントのロジックの再利用が難しい状態に陥ってしまいがちだった。

- コンポーネントのライフサイクルメソッド内にさまざまなロジックが混在し、コードの可読性が低下してしまう。(componentDidMount 内にデータフェッチの処理とイベントリスナーをセットする処理が混在しているなど)。また、ステートフルなロジックがあちこちに散らばって、小さなコンポーネントに分割することが難しくなる。

- ライフサイクルメソッドを使うには、コンポーネントを JavaScript の Class で定義しないといけなかった。

フックの登場によって、コンポーネントを関数コンポーネントで定義することが可能になり、フックの各関数によってコンポーネントのステートフルな処理を容易に再利用することができるようになる＋再利用性の高いコンポーネントを定義しやすくなる。

[useScript](https://usehooks.com/usescript)

React のコンポーネント内に外部の JavaScript ソースを読み込むことができ、コンポーネントがアンマウントされると自動的に読み込んだスクリプトを取り除くことができる。

[useLocalStorage](https://usehooks-ts.com/react-hook/use-local-storage)

web ブラウザの localStorage を useState っぽい記法で書ける hook。型を指定することで型安全に localStorage を扱うことができる。

## 課題 2

「Container」と「Presentational」に分けることで、

- ロジックと UI を分割することができる。それによって
  - コンポーネントの可読性が高まる。
  - UI やロジックの再利用性が高まる。ピュアな UI コンポーネントやロジックに切り出せる
  - UI やロジックの責務を明確に分割できる。

React Hooks が登場した現在においても有用であると考える。

[ref: frontend/next.js/components/organisms/Users/index.tsx](frontend/next.js/components/organisms/Users/index.tsx)

**Controlled vs Uncontrolled**

| Controlled                                                             | Uncontrolled                                                                   |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| コンポーネントは、コンポーネントの状態に制御されている。               | コンポーネントは DOM に制御されている。                                        |
| これらのコンポーネントは、コンポーネントの状態によって予測可能である。 | ライフサイクルメソッド中にデータが失われる可能性があるため、制御されていない。 |
| 内部状態は維持されていない                                             | 内部状態は維持されている                                                       |
| 現在の値を props として受け入れる                                      | 値は refs を使用してアクセスする                                               |
| 内部状態は維持されていない。                                           | 内部状態は維持されている。                                                     |
| 親コンポーネントによって制御される。                                   | DOM 自体によって制御される。                                                   |
| フォームデータと値をよりよく制御する                                   | フォームの値とデータをほとんど制御できない                                     |

**Controlled**

| props                                        | cons                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| リアルタイムな入力値の検証ができる           | フォームの状態が変わるたびに再レンダリングが発生する。(cons とも言えないかも)                     |
| より複雑なバリデーションロジックが実現できる | React Hook Form などのフォーム管理用のライブラリを入れる分だけ、依存関係が増えバンドルサイズが up |

→ バリデーションにリアルタイム性が求められていたり、複雑なバリデーションロジックが求められるケースでは採用したい。

**Uncontrolled**

| props                                                                                  | cons                                                  |
| -------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| フォームの状態管理のための実装が不要になる。(useState や react hook form との連携など) | リアルタイムの入力値の検証ができない。submit 時に検証 |
| フォーム管理が簡素になる分、フォームの実装がすばやくできる                             |                                                       |
| フォーム入力時に再レンダリングが発生しない                                             |                                                       |

→ プロトタイピング的な感じで素早く form 実装しないといけないケースや、form 周りへの React の関与を最小化したいケースでは採用したい。

## 課題 3

**Q1**

`isOpen`の値が true の時、以下のコード例の button を click すると、再レンダリングが発生するでしょうか？

```tsx
function Example() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        isOpenをtrueにするボタン
      </button>
    </>
  );
}
```

**Q2**

`obj`の値が `{ isOpen: true }` の時、以下のコード例の button を click すると、再レンダリングが発生するでしょうか？

```tsx
function Example() {
  const [obj, setObj] = useState({ isOpen: true });

  return (
    <>
      <button
        onClick={() => {
          setIsOpen({ isOpen: true });
        }}
      >
        isOpenをtrueにするボタン
      </button>
    </>
  );
}
```

**Q3**

以下のようなコンポーネントについて考える。

```tsx
import { useState, FC } from 'react';

type Props = {
  hoge: boolean;
  fuga: boolean;
};

export const StateModal: FC<Props> = ({ hoge, fuga }) => {
  const [open] = useState(hoge && fuga);
  return (
    <div
      style={{
        color: 'red',
      }}
    >
      {open ? 'open' : 'close'}
    </div>
  );
};

export const ConstModal: FC<Props> = ({ hoge, fuga }) => {
  const open = hoge && fuga;
  return (
    <div
      style={{
        color: 'green',
      }}
    >
      {open ? 'open' : 'close'}
    </div>
  );
};
```

`StateModal`と`ConstModal`は`open`という値の定義方法が異なる。

```tsx
import React from 'react';

export default function Home() {
  const [hoge, setHoge] = React.useState(true);
  const [fuga, setFuga] = React.useState(true);
  return (
    <>
      <button onClick={() => setHoge(!hoge)}>change Hoge</button>
      <button onClick={() => setFuga(!fuga)}>change Fuga</button>
      <StateModal hoge={hoge} fuga />
      <ConstModal hoge fuga={fuga} />
    </>
  );
}
```

上記のようにコンポーネントから呼び出されると仮定する。
`change Hoge`ボタンと`change Fuga`ボタンをクリックしたときに、

- StateModal
- ConstModal

はそれぞれどのような文字を表示するでしょうか？

ref: [setState を使わない useState の意義](https://www.sunapro.com/use-state-without-set-state/)
