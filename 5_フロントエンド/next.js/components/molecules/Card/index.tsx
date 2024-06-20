import styles from './styles.module.scss';

//TODO: Propsの型定義
type Props = {
  header: string;
  body: React.ReactNode;
};

export const Card: React.FC<Props> = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>{props.header}</div>
      <div className={styles.cardBody}>{props.body}</div>
    </div>
  );
};
