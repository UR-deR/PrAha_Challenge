# Effect hook を理解する

## 課題 1

cleanup 処理が無いとメモリリークなどの問題を引き起こす可能性があるから。

1. サーバーに、ユーザー ID を使って特定のユーザーの情報を取得するようリクエストしたとする。
2. リクエストが完了する前に、気が変わって別のユーザーの情報を取得するために別のリクエストをしようとする。
3. この時点では、コンポーネントがアンマウントされたり依存関係が変更されたりした後でも、両方のフェッチリクエストが実行され続けることになる。
4. 古い情報を表示したり、マウントされなくなったコンポーネントを更新しようとするなど、予期しない動作やエラーにつながる可能性がある。

したがって、cleanup 処理を用いてアクティブなサブスクリプションや非同期のリクエストを中断することで、アプリケーション内のメモリリーク関連の問題を回避することができる。

## 課題 4

### Q1

React18 と React17 以前では、`useEffect`の挙動にどのような違いがあるでしょうか？  
(※[StrictMode](https://react.dev/reference/react/StrictMode) であるとする。)
またこの挙動の違いには、どのような背景があるでしょうか？

### Q2

[コードサンプル](https://gist.github.com/UR-deR/6e36bf2e4e18a321b20deefc52dbbdee)

上記のコードサンプルをローカル環境で動かしても、Post 一覧が表示されない。なぜでしょうか？

### Q3

あるプロフィールページがあり、コメントを入力するための input 要素が存在する。
ある user のプロフィールページから、別のユーザーのプロフィールページに遷移した時に、input の value がリセットされなかったため、以下のような useEffect のコードブロックを書いた。

```tsx
export default function ProfilePage({ userId }) {
  return (
    <div>
      <Profile userId={userId} />
    </div>
  );
}

function Profile({ userId }) {
  const [comment, setComment] = useState('');

  //これがあると、別のユーザーのプロフィールページに遷移した時にinputのvalueがリセットされる。
  useEffect(() => {
    setComment('');
  }, [userId]);

  return (
    <div>
      <input type="text" name="comment" value={comment} onChange={(event) => setComment(event.target.value)} />
    </div>
  );
}
```

しかし、この`useEffect`のコードブロックを付け足す方法は、レンダリング回数の観点で望ましいとは言えない。(ProfilePage とその子コンポーネントは、まず古い値でレンダリングし、それから再度レンダリングするので非効率的だから)

> ある user のプロフィールページから、別のユーザーのプロフィールページに遷移した時に、input の value がリセットされなかった

という問題を`useEffect`を使わずに解決するにはどのようにしたらよいでしょうか？
