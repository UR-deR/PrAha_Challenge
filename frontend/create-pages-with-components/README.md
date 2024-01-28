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
