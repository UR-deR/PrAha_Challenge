import { useState, useEffect, useRef } from "react";

// こちらにパフォーマンス測定のための処理を実装してください
export function Profiler({ Component, onFinishMeasure }) {
  // 現時点では渡されたComponentを1000回レンダリングしているだけです。
  // useRef, useState, useEffectを活用して、
  // 1000回レンダリングが終了するまでに要した時間をonFinishMeasureに返せるようにしましょう
  const children = [];

  for (let i = 0; i < 1000; i++) {
    children.push(<Component key={i} />);
  }

  return <>{children}</>;
}
