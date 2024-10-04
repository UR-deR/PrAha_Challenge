import { useEffect, useState } from 'react';

export const SomeComponent = ({ someFlag }) => {
  const [renderedCount, setRenderedCount] = useState(0);
  useEffect(() => {
    setRenderedCount((count) => count + 1);
  }, [someFlag]);
  return (
    <>
      <p>ここに、このコンポーネントがレンダリングされた回数を表示してみよう!</p>
      <p>レンダリングされた回数: {renderedCount}</p>
    </>
  );
};
