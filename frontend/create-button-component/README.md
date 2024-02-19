## よくあるボタンコンポーネントを作成する

### 課題 1

`frontend/next.js/components/atoms/Kadai39Button/index.tsx`にて実装

### 課題 2

> props.children

**メリット**

- Button コンポーネントの呼び出し側では、開始タグと終了タグの間に表示するテキストを書くことになり、HTML と同じような書き具合になる。

HTML

```html
<button>children</button>
```

JSX

```js
<Button>children</Button>
```

**デメリット**

- 考え中

> props.text

**メリット**

- 考え中

**デメリット**

- props.children の記法のメリットが得られない。

[ref: React props vs children. What to use when?](https://stackoverflow.com/questions/56003891/react-props-vs-children-what-to-use-when)
