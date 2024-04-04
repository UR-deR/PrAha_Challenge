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

## 課題 2

回答: [あるコンポーネントが 1000 回レンダリングされるまでに要した時間を測定する](https://github.com/UR-deR/PrAha_Challenge/commit/7f90632767b5359544987eb435e18e6e9a01ba23)

結果

<img width="735" alt="スクリーンショット 2024-04-04 21 07 16" src="https://github.com/UR-deR/PrAha_Challenge/assets/76472239/ad60a85a-8143-4bc2-a92c-ae64cdd0b2b8">


### 課題 3

[input の focus](https://github.com/UR-deR/PrAha_Challenge/commit/68088bc46ad98c7452192e9fe11077dd74d61119)のように DOM ノード を扱うケースなどで用いることがある。

参考: [React useRef() Hook Explained in 3 Steps](https://dmitripavlutin.com/react-useref/#google_vignette)
