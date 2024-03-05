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

### 課題 3

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
