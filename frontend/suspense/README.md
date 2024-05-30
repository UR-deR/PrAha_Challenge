## Suspense（旧 Concurrent mode）を理解する

### 課題 1

非同期のコンポーネントやデータの読み込みをサポートするために使用される。
主な目的として、コンポーネントが必要なデータを読み込むまで待機し、読み込み中にフォールバック UI（通常はローディングスピナーなど）を表示することです。

```tsx
function App() {
  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </React.Suspense>
    </div>
  );
}
```

背景

1. 非同期データの管理の難しさ
   従来の React では、コンポーネントがデータを取得するまでに「ローディング中」の状態を手動ないし、専用のライブラリで管理する必要があった。
   これには、ローディング状態をトラッキングして、適切に UI を更新するための苦労が必要だった。

2. UI の一貫性
   非同期操作（データ取得やコード読み込み）が発生するたびに、ユーザーに一貫したフィードバックを提供するのは困難だった。
   異なるコンポーネントやページで異なるローディングインジケータ（スピナー、プレースホルダー、空白など）を使用すると、ユーザーは混乱し、アプリケーションの動作が予測しにくくなる。

React.Suspense を使うことで、ローディング中の状態を簡単に管理できるようになる。fallback プロパティを指定するだけで、読み込み中の UI を設定できる。
Suspense は、非同期コンポーネントの読み込み状態を自動的に管理するため、開発者が手動でローディング状態を追跡する必要がない。
これにより、コードスプリッティングの複雑さが減り、一貫した UX を保ちやすくなる。

**従来**

```tsx
class MyComponent extends React.Component {
  state = { data: null, loading: true };

  componentDidMount() {
    fetchData().then((data) => {
      this.setState({ data, loading: false });
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return <div>{this.state.data}</div>;
  }
}
```

**Suspense 以後**

```tsx
const MyComponent = React.lazy(() => import('./MyComponent'));

function App() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </React.Suspense>
  );
}
```

Suspense は当初は、React.lazy を使ったクライアントでのコード分割のユースケースのみでしか用いられていなかった。
また SSR では使用できなかった。

↓

React18では、Suspense を用いて、あらゆる非同期操作（コード、データ、画像 etc）を処理できるように.

### 課題 2

> コンポーネント内部での状態管理

コンポーネント内部が複雑になりうる。
データ取得する処理が複数になった場合や、Hoge コンポーネントの子コンポーネント内でデータ取得が発生する場合に、非同期処理の管理が複雑になる。
一方 Suspense を用いれば、ローディング状態の管理をしなくても良くなるし、データ取得を行う子コンポーネントが存在していたとしても最も近い Suspense が適用される。

> fallback が毎回でるのが煩わしい

React.Transtion と React.Suspense を用いることで、fallback を表示しないことが可能。
つまり、サスペンド前 → 表示完了という UI 遷移が可能になる。

[frontend/next.js/pages/tabs.tsx](https://github.com/UR-deR/PrAha_Challenge/blob/main/frontend/next.js/pages/tabs.tsx)

- タブ切り替え時にデータフェッチが発生するが、データフェッチが完了するまでタブを切り替えない、という対応が可能。
- fallback のコンポーネントを表示しない。

> SSR における Suspense の恩恵

**Suspense on Backend === Streaming HTML**

SSR ではバックエンドの node サーバーで React コンポーネントを HTML に変換する。
`<Suspense>`は streaming HTML として扱う。

- `<Suspense>`の Promise が pending 状態である時、fallback プロパティに指定したコンポーネントを frame として返す。

- `<Suspense>`の Promise が resolve された時、Suspense の Children が frame として返される。

- `<Suspense>`の Promise が fail した時、error-boundary の frame が返される。

> ソフトウェア設計の観点から、React が Suspense を導入した意味を考察

1. 非同期処理の統一管理
   React の Suspense は、非同期処理をシンプルで直感的に管理する手段を提供する。従来の方法では、非同期処理の管理が複雑になりがちで、コードの可読性や保守性が低下することがあった。Suspense は、非同期データのロード中に UI をどう表示するかを簡単に制御できるようにすることで、この問題を解決する。

2. コードのモジュール化と再利用性
   Suspense は、コンポーネントのローディング状態を簡潔に管理できるため、コードのモジュール化と再利用性が向上する。開発者は、各コンポーネントごとにローディングロジックを記述する必要がなくなり、より一貫した方法で非同期データの取得と表示を行うことができる。

3. エラーハンドリングの簡素化
   非同期処理にはエラーがつきものだが、Suspense を用いることで、エラーハンドリングを一元的に管理することができる。error-boundary と組み合わせることで、エラー時の UX も向上する。

4. 将来の機能拡張への基盤
   Suspense は React の未来を見据えた機能でもある。例えば、React Server Components のような将来的な機能拡張に対する基盤として設計されている。これにより、より大規模で複雑なアプリケーションにも対応可能な柔軟性を持たせることができる。

React が Suspense を開発した背景には、TTI の改善という具体的な目標に加えて、非同期処理の管理、UX の向上、コードのモジュール化、エラーハンドリングの簡素化、将来の機能拡張への対応といった、より広範なソフトウェア設計上の課題を解決する意図が含まれている(と思う)。Suspense は、React のエコシステム全体の健全性と成長を促進する重要な機能として位置づけられていると思われる。

### 課題 3

[Remix SPA モード](https://remix.run/docs/en/main/guides/spa-mode)

> その技術が解決したい課題は何なのか

- Remix をフロントエンド用のサーバーを用意しなくても利用可能にする。単に S3 などにホスティングするだけで良くなる。
- Web 標準の API を用いることで開発者の学習コストを抑える。
- ファイルベースルーティングや route.lazy による自動的なコード分割などを FW として提供。

> どういう背景から生まれたのか

- Remix は当初はフロントエンド用のサーバーを所有していることが前提の FW だった。サーバーを持つことで最高の UX/パフォーマンス/SEO を提供できると考えていたから。
- しかし、現実には SPA の方が望ましいようなケースもある。
- そのようなユースケースへのアプローチとして、Remix SPA モードが生まれた。

> その技術に対して挙げた反証的な疑問
