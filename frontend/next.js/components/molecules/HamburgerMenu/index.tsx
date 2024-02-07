import styles from './styles.module.scss';

export const HamburgerMenu: React.FC = () => {
  return (
    <button className={styles.hambergerMenu}>
      <div></div>
      <div></div>
      <div></div>
    </button>
  );
};
