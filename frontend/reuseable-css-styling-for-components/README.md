## 再利用しやすいコンポーネントの css を考える

### 課題 1

汎用性が求められるボタンコンポーネントなのに、margin を持っていることが問題である。  
このボタンが margin を持つことによって、margin を必要としない場面においてこのコンポーネントを利用することができなくなってしまう。  
汎用性が求められるコンポーネントなのに、ページのレイアウトに依存したスタイルを帯びてしまっている。

[→ 修正した](https://github.com/UR-deR/PrAha_Challenge/commit/e0d5d411dcdc94d987fda1ecff2c9c70d909c13c)

### 課題 2

Sidemenu、MainContent はそれぞれ flex という css のプロパティを持っている。これは親コンポーネントが display: flex を指定している場合のみ有効である。

Sidemenu や MainContent は Molecule や Organism に相当するコンポーネントであるが、これらのコンポーネントが Atomic Design における上位のレイヤーのコンポーネントに依存してしまっているので、依存の向き先としてルール違反である。

親コンポーネントが `display: flex`のケースにおいてしか利用できないので、再利用性が低いコンポーネントとなってしまっている。

- 子コンポーネントは親コンポーネントに依存しないようにする
- 親コンポーネントが配置の指定を担う

上記のようにすれば、子コンポーネントの再利用性を向上させることが期待できる。

[→ 修正した](https://github.com/UR-deR/PrAha_Challenge/commit/5db3fb19d2d57ff02627656785b44810174d0ead)

### 課題 3

`MenuItem`コンポーネントは li 要素なので、親要素は`ul`or`ol`である必要がある。しかし、MenuItem の親要素を`ul`や`ol`以外（例えば div など）にしたとしても、コンパイル時に検知することができない。MenuItem コンポーネントを呼び出す側は、「MenuItem コンポーネントは li 要素である」と意識しながら呼び出さないといけない。呼び出し側が、汎用コンポーネントの内部事情を意識しないといけない状況は、好ましくなさそう。

[→ 修正した](https://github.com/UR-deR/PrAha_Challenge/commit/f149a5e2c5b5cc7f1849806d8390168ae4198d66)

呼び出し側から MenuItem の root node の html 要素を指定できるようにすれば、MenuItem コンポーネントの呼び出しが安全になると考えた。

参考：

mui の[ListItem](https://mui.com/material-ui/api/list-item/)コンポーネントも、呼び出し側で root node の要素を指定できるようにしている。