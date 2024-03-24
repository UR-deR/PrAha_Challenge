## 課題 1

- [uuid](https://www.npmjs.com/package/uuid)
- [uuid-js](https://www.npmjs.com/package/uuidjs)

両者の uuid v4 の生成速度を比較する。

```ts
import cac from 'cac';
const { performance: p } = require('perf_hooks');
import { v4 } from 'uuid';
const UUID = require('uuid-js');

const cli = cac('measure-performance');

const measurePerformance = (func: () => unknown): number => {
  const start = p.now();
  func();
  const end = p.now();
  const performance = end - start;
  return performance;
};

cli.command('perfomance', 'compare performance between uuid and uuid-js').action(() => {
  const performance = measurePerformance(() => {
    for (let i = 0; i < 1000000; i++) {
      v4();
    }
  });
  console.log(`uuid: ${performance}ms`);

  const performance2 = measurePerformance(() => {
    for (let i = 0; i < 1000000; i++) {
      UUID.create(4);
    }
  });
  console.log(`uuid-js: ${performance2}ms`);
});

cli.version('0.0.0-sample');

cli.parse();
```

**結果**

```bash
❯ npm run cli perfomance

> sample@0.0.0 cli
> vite-node ./performance.ts -- perfomance

uuid: 97.69187450408936ms
uuid-js: 1637.917917251587ms
```
