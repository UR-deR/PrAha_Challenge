import { Header } from '@/components/organisms/Header';
import styles from './styles.module.scss';
import { Footer } from '@/components/organisms/Footer';

type Props = {
  children: React.ReactNode;
};

export const BasicTemplate: React.FC<Props> = (props) => {
  return (
    <>
      <Header />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </>
  );
};
