import styles from './styles.module.scss';
import { Heading } from '../../atoms/Heading';
import { Paper } from '@/components/atoms/Paper';

export const About: React.FC = () => {
  return (
    <Paper>
      <section className={styles.about}>
        <Heading level={2} fontWeight={500}>
          このサイトはテスト自動化の学習用の練習サイトです。
        </Heading>
        <p>
          Seleniumなどのブラウザテスト自動化を学習したい方が、実際にテストスクリプトを実行するための
          <span className={styles.bolder}>テスト対象サイト</span>として作成されています。
        </p>
        <p>
          書籍やブログなどでのサンプルやデモにもお使いいただけます。ライセンスは
          <a href="https://github.com/testplanisphere/hotel-example-site/blob/main/LICENSE" target="_blank">
            MIT License
          </a>
          です。
        </p>
        <p>自動テストの学習を目的として作成されていますが、テスト設計や技法の学習に使うことも可能です。</p>
      </section>
    </Paper>
  );
};
