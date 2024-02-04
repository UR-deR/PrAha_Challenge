import styles from './styles.module.scss';

type Props = {
  heads: string[];
  rows: React.ReactNode[];
};

export const BasicTable: React.FC<Props> = (props) => {
  return (
    <table className={styles.table}>
      <caption>登録済みユーザー</caption>
      <thead>
        <tr>
          {props.heads.map((head, index) => {
            return (
              <th key={index} scope="col">
                {head}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, index) => {
          return <tr key={index}>{row}</tr>;
        })}
      </tbody>
    </table>
  );
};
