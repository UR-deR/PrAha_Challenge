import styles from './styles.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/testplanisphere/hotel-example-site" target="_blank">
        GitHub
      </a>
      <span>&copy; 2020 Test Planisphere</span>
    </footer>
  );
};
