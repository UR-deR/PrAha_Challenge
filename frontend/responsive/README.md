## 作ったページをレスポンシブ対応しよう

### 課題 1

割愛。レスポンシブ対応済み

### 課題 2

> ユーザーのデバイス種別

**メリット**

- デバイス特有の分岐ができる。iPhone の場合の分岐、Android 端末の場合の分岐、iPad の場合の分岐など、細かい分岐を増やせる。

**デメリット**

- 新たなデバイスが増えるたびに、デバイス判定処理に手を加える必要性が生じる。

> css のメディアクエリ

**メリット**

- デバイス関係なく、ビューポートに応じてスタイルを切り替えることができるので、管理が楽。デバイスごとの対応は不要。

**デメリット**

- CSS の概念なので、JavaScript 上での分岐のために用いることができない。

→JavaScript の[Window.matchMedia](https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia)を用いれば、`isSmartPhone`ような boolean の変数を定義することができるため、JavaScript や JSX 上で参照することができる。

```ts
import { useEffect, useState } from 'react';

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const listener = () => {
      setIsMobile(mediaQuery.matches);
    };

    mediaQuery.addEventListener('change', listener);

    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  return { isMobile } as const;
};
```

> PC と SP で URL を分けてしまう

**メリット**

- css の記述が多少楽になる。max-width を意識して css を書かなくて良いため。
- [suumo](https://suumo.jp/sp/)のように、PC と SP とで UI に大きな乖離がある場合は、メディアクエリで表示・非表示を制御しきれない場合があるため、そのようなケースでは URL を分けるのは有効。

**デメリット**

- PC と SP で 2 重でソースコードを管理しないといけない
- URL をシェアするときに、相手が PC ユーザーなのに SP の URL をシェアしてしまう。逆も然り。
