import styles from './styles.module.scss';

type Props = {
  onClick: () => void;
};

export const HamburgerMenu: React.FC<Props> = (props) => {
  return (
    <button className={styles.hambergerMenu} onClick={props.onClick}>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};
