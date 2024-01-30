import styles from './styles.module.css';
import { Heading } from '../../atoms/Heading';
import { LinkButton } from '../../atoms/LinkButton';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <Heading level={1}>HOTEL PLANISPHERE</Heading>
      <nav>
        <div>
          <ul className={styles.ul}>
            {(
              [
                {
                  href: '/home',
                  children: 'ホーム',
                  variant: 'text',
                },
                {
                  href: 'booking',
                  children: '宿泊予約',
                  variant: 'text',
                },
                {
                  href: 'signup',
                  children: '会員登録',
                  variant: 'text',
                },
                {
                  href: 'login',
                  children: 'ログイン',
                  variant: 'outlined',
                },
              ] as const
            ).map(({ children, ...rest }, index) => {
              return (
                <li key={index}>
                  <LinkButton {...rest}>{children}</LinkButton>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};
