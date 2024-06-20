export const measurePerformance = (func: () => unknown): number => {
  const start = window.performance.now();
  func();
  const end = window.performance.now();
  const performance = end - start;
  console.log(`Performance: ${performance}ms`);
  return performance;
};
