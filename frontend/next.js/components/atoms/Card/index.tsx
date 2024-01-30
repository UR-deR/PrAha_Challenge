import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

export const Card: React.FC<Props> = (props) => {
  return <div className={styles.card}>{props.children}</div>;
};
