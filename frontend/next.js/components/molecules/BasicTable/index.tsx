import styles from './styles.module.scss';

//TODO: Propsの型定義
type Props = {};

export const BasicTable: React.FC<Props> = (props) => {
  return (
    <table className={styles.table}>
      <caption>登録済みユーザー</caption>
      <thead>
        <tr>
          {/* TODO: 文言はpropsでinject */}
          <th scope="col">#</th>
          <th scope="col">メールアドレス</th>
          <th scope="col">パスワード</th>
          <th scope="col">会員ランク</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>1</th>
          <td>
            <code>ichiro@example.com</code>
          </td>
          <td>
            <code>password</code>
          </td>
          <td>プレミアム会員</td>
        </tr>
        <tr>
          <th>2</th>
          <td>
            <code>ichiro@example.com</code>
          </td>
          <td>
            <code>password</code>
          </td>
          <td>プレミアム会員</td>
        </tr>
      </tbody>
    </table>
  );
};
