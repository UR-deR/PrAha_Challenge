import { useState, useRef } from 'react';

// こちらにパフォーマンス測定のための処理を実装してください
export function Profiler({ Component, onFinishMeasure }) {
  // 現時点では渡されたComponentを1000回レンダリングしているだけです。
  // useRef, useState, useEffectを活用して、
  // 1000回レンダリングが終了するまでに要した時間をonFinishMeasureに返せるようにしましょう
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);
  const [renderFlag, setRenderFlag] = useState(false);
  const children = [];

  for (let i = 0; i < 1000; i++) {
    children.push(
      <Component
        key={i}
        index={i}
        startTimeRef={startTimeRef}
        endTimeRef={endTimeRef}
        onFinishMeasure={onFinishMeasure}
      />
    );
  }

  console.log(startTimeRef, endTimeRef);

  return (
    <>
      <button onClick={() => setRenderFlag(true)}>start</button>
      <br />
      {renderFlag ? children : null}
    </>
  );
}
