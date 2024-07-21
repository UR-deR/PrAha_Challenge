# 適切にコンポーネントを分割して 1 ページ作ってみよう

## 課題 1

アトミックデザインは、UI をまとまった全体として、また同時にパーツの集合体として考えるための**メンタルモデル**である。  
アトミックデザインでは Atom, Molecule, Organism, Template, Page の 5 階層に UI コンポーネントを区分し、それらが同時に作用し合うことで効果的な UI デザインシステムを構築することが可能になる。

**Atom**

フォームのラベル、ボタン、フォームの input 要素など、機能上これ以上分解することができない要素。　　
特定のページやコンテキストに依存するようなスタイルは持たせず、シンプルで再利用可能性を損ねないようにする。

**Molecule**

複数の Atom から構成されており、ユニットとして機能する要素。  
`e.g. ボタン+フォームのラベル+input = 検索フォーム`

Atom や Molecule をシンプルな作りにすることによって、テストが容易になり、再利用性が促進され、インターフェース全体の一貫性が担保される。

**Organism**

Oraganism は Atom, Molecule, その他の Organism から構成される、UI の個別のセクションを形成する比較的複雑なコンポーネントである。
Atom や Molecule よりも、より文脈味を帯びたコンポーネントである。

`e.g. 検索フォーム　+ ロゴ画像 + ハンバーガーメニュー = ヘッダー`

**Template**

Template はコンポーネントをレイアウトに配置し、デザインの基本的な構造を明確にする。ページの最終的なコンテンツには着目せず、ページの骨格に焦点を当てている。  
ページの骨格を定義することで、さまざまな動的コンテンツに対応できるページを作成することができる。

**Page**

ページは、実際のコンテンツが配置された UI がどのように見えるかを示す、テンプレートの特定のインスタンスである。
Template は骨格のみを提供するが、Page は動的なコンテンツを流し込むことで、最終的な成果物を完成させる。

[Atomic Design Methodology](https://atomicdesign.bradfrost.com/chapter-2/)

---

**Function Component vs Class Component**

> Function Component

JavaScript の関数を宣言する時の記法でコンポーネントを定義する。
戻り値として JSX を返すことで、DOM 要素を render することができる。　　
引数で props を受け取ることが可能。

```js
function Button(props) {
  return (
    <button onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
}
```

> Class Component

JavaScript の Class を宣言する時の記法でコンポーネントを定義し、`React.Component`クラスを継承する必要がある。
render メソッドの戻り値として JSX を返すことで、DOM 要素を render することができる。

```js
class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} type={this.props.type}>
        {this.props.chlidren}
      </button>
    );
  }
}
```

> どっちを使うべきか

- コード量が少ない
- コンテナ・コンポーネントとプレゼンテーショナル・コンポーネントの分離が容易 → テスト書きやすい
- [React のドキュメントで Class コンポーネントの使用が推奨されていない](https://react.dev/reference/react/Component#alternatives:~:text=what%20componentDidMount%20does.-,Pitfall,-We%20recommend%20defining)

より、関数コンポーネントを採用すべきである。

[Functional vs Class-Components in React](https://djoech.medium.com/functional-vs-class-components-in-react-231e3fbd7108)

## 課題 2

- ページレイアウト内に要素に対するスペースが設けられないためページをズームしてテキストの大きさを拡大したりすると、その他の要素に覆い被さってしまい、UI が崩れてしまう恐れがある。
- 新たに要素を追加したり削除したりする際に、全ての要素の配置を個々に調整しなおす必要性が生まれる。
- レスポンシブ対応の際に、ブレイクポイントごとに全ての要素を配置し直す必要があり非常に煩雑。

参考

- [position: abosolute](https://developer.mozilla.org/en-US/docs/Web/CSS/position#absolute)
- [Is it bad to use 'position: absolute' for almost everything?](https://www.reddit.com/r/Frontend/comments/s7blr6/is_it_bad_to_use_position_absolute_for_almost/)

### 課題 3

- チーム開発をする際に、チーム全体で Atom, Molecule, Organism, Template, Page の 5 階層についての理解が揃っていないと、コンポーネントの分割粒度がバラバラになってしまう。
- 階層の境界を区別しにくい。そもそも 5 階層に区別する必要が本当にあるのか？

例: Molecules vs Organisms

> Molecules are relatively simple groups of UI elements functioning together as a unit.  
> Organisms are relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms.

---

1. Organism を pages 内の各 page コンポーネントと同階層に配置している。Organisms はページについての知識を持つので、pages 配下にあっても違和感がないと思った。また、関係ない page から呼び出されることが防げることが期待できそう。
1. Atom と Molecule を一まとめにして、common と称した。コンポーネントが「分解可能か否か」はページを組み立てる上で重要ではないと思った。common ディレクトリのコンポーネントは特定の画面やコンテキストに依存しない、別プロジェクトでも使いまわせるコンポーネントを定義

こうすることで、不必要にコンポーネントの層を増やさなくても良くなるため、コンポーネントの層の区別に迷うことがなくなると思われる。

```
.
├── pages
│   └── News
│       ├── NewsCard.tsx
│       ├── NewsList.tsx
│       ├── NewsSearchForm.tsx
│       ├── index.tsx
│       └── style.css
├── templates
│   └── AuthenticatedTemplate
│       ├── index.tsx
│       └── style.css
└── common
    └── Button
        ├── index.tsx
        └── style.css
```
