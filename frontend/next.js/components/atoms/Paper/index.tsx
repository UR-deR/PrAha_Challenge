import styles from './styles.module.css';

type Props = {
  children: React.ReactNode;
};

export const Paper: React.FC<Props> = (props) => {
  return <div className={styles.paper}>{props.children}</div>;
};
