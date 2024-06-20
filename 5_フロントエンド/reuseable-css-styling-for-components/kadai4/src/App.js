import React from 'react';
import { CustomBlueButton } from './CustomBlueButton';
import { FixedCustomButton } from './FixedCustomButton.tsx';
import './styles.css';

export default function App() {
  const [isDisabled, setIsDisabled] = React.useState(false);
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <CustomBlueButton />

      <hr />

      {/* 型を参考に適切なPropsの値を指定することが可能になる。コンポーネントのcssファイルを覗きに行かなくても良くなる。 */}
      <FixedCustomButton
        onClick={() => {
          setIsDisabled((prev) => !prev);
        }}
        color={'green'}
      >
        ↓のdisabled切り替えボタン
      </FixedCustomButton>

      <br />

      <FixedCustomButton onClick={() => {}} disabled={isDisabled} color={'blue'}>
        背景色が活性状態に基づいて切り替わるよ
      </FixedCustomButton>
    </div>
  );
}
