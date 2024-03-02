## 課題 1

[useScript](https://usehooks.com/usescript)

React のコンポーネント内に外部の JavaScript ソースを読み込むことができ、コンポーネントがアンマウントされると自動的に読み込んだスクリプトを取り除くことができる。

### 課題 3

**Q1**

`isOpen`の値が true の時、以下のコード例の button を click すると、再レンダリングが発生するでしょうか？

```tsx
function Example() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        isOpenをtrueにするボタン
      </button>
    </>
  );
}
```

**Q2**

`obj`の値が `{ isOpen: true }` の時、以下のコード例の button を click すると、再レンダリングが発生するでしょうか？

```tsx
function Example() {
  const [obj, setObj] = useState({ isOpen: true });

  return (
    <>
      <button
        onClick={() => {
          setIsOpen({ isOpen: true });
        }}
      >
        isOpenをtrueにするボタン
      </button>
    </>
  );
}
```
