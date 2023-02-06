# スナップショットテストを書こう

## 課題 1

変更前の出力結果と変更後の出力結果を見比べて、差分がないこと（もしくはあること）を確認するテスト。
予期しない UI の変更を確認したいときに、有用なテストである。一般的には、UI コンポーネントをレンダリングし、そのスナップショットを取得して、以前、取得した参照用のスナップショットと比較する。２つのスナップショットが一致しない場合、テストが失敗するため、何らかの変更が起こったときに簡単に検知することができる。

### 具体例

1.

## 課題 2

## 課題 3

Q1. 以下のスナップショットテストは実行すると毎回失敗してしまう。このテストを PASS させるにはどのようにすればよいでしょうか？

```javascript
it('will fail every time', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };

  expect(user).toMatchSnapshot();
});

// Snapshot
exports[`will fail every time 1`] = `
Object {
  "createdAt": 2018-05-19T23:36:09.816Z,
  "id": 3,
  "name": "LeBron James",
}
`;
```

Q2. 以下のようなランダム性を文字列を含んだ文字列の snapshot テストを実装したい場合、どのようにすべきでしょうか。

```javascript
const randomNumber = Math.round(Math.random() * 100);
const stringWithRandomData = `<div id="${randomNumber}">Lorem ipsum</div>`; // ←stringWithRandomDataに対してのsnapshotを作成したい
const xxx = stringWithRandomData.hogehoge().fugafuga(); // この行でどのような処理を行ってあげればよいでしょうか
expect(xxx).toMatchSnapshot();
```

Q3. インラインスナップショットと外部スナップショット(`.snapファイル`)の違いはなんでしょうか？
