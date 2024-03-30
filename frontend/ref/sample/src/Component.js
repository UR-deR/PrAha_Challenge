import { useEffect } from 'react';

const FIRST_RENDER = 0;
const LAST_RENDER = 999;

export function SomeComponent({ index, startTimeRef, endTimeRef, onFinishMeasure }) {
  useEffect(() => {
    if (index === FIRST_RENDER) {
      startTimeRef.current = performance.now();
    } else if (index === LAST_RENDER) {
      endTimeRef.current = performance.now();
      onFinishMeasure(endTimeRef.current - startTimeRef.current);
    }
  }, []);
  return <p>Hello!</p>;
}
