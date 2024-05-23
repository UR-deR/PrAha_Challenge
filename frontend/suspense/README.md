## Suspense（旧Concurrent mode）を理解する

### 課題1

非同期のコンポーネントやデータの読み込みをサポートするために使用される。
主な目的として、コンポーネントが必要なデータを読み込むまで待機し、読み込み中にフォールバックUI（通常はローディングスピナーなど）を表示することです。

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
従来のReactでは、コンポーネントがデータを取得するまでに「ローディング中」の状態を手動ないし、専用のライブラリで管理する必要があった。
これには、ローディング状態をトラッキングして、適切にUIを更新するための苦労が必要だった。

2. UIの一貫性
非同期操作（データ取得やコード読み込み）が発生するたびに、ユーザーに一貫したフィードバックを提供するのは困難だった。
異なるコンポーネントやページで異なるローディングインジケータ（スピナー、プレースホルダー、空白など）を使用すると、ユーザーは混乱し、アプリケーションの動作が予測しにくくなる。


React.Suspenseを使うことで、ローディング中の状態を簡単に管理できるようになる。fallbackプロパティを指定するだけで、読み込み中のUIを設定できる。
Suspenseは、非同期コンポーネントの読み込み状態を自動的に管理するため、開発者が手動でローディング状態を追跡する必要がない。
これにより、コードスプリッティングの複雑さが減り、一貫したUXを保ちやすくなる。

**従来**

```tsx
class MyComponent extends React.Component {
  state = { data: null, loading: true };

  componentDidMount() {
    fetchData().then(data => {
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

**Suspense以後**

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

Suspenseは当初は、React.lazyを使ったクライアントでのコード分割のユースケースのみでしか用いられていなかった。
またSSRでは使用できなかった。

↓
Suspenseを用いて、あらゆる非同期操作（コード、データ、画像etc）を処理できるようにしたい。

### 課題2

> コンポーネント内部での状態管理

コンポーネント内部が複雑になりうる。
データ取得する処理が複数になった場合や、Hogeコンポーネントの子コンポーネント内でデータ取得が発生する場合に、非同期処理の管理が複雑になる。
一方Suspenseを用いれば、ローディング状態の管理をしなくても良くなるし、データ取得を行う子コンポーネントが存在していたとしても最も近いSuspenseが適用される。

> fallbackが毎回でるのが煩わしい

React.TranstionとReact.Suspenseを用いることで、fallbackを表示しないことが可能。
つまり、ローディング状態のUIをスルーして、サスペンド前→表示完了というUI遷移が可能になる。