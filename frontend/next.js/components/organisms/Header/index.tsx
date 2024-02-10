import styles from './styles.module.scss';
import { Heading } from '../../atoms/Heading';
import { LinkButton } from '../../atoms/LinkButton';
import { useMediaQuery } from '../../utils/mediaQuery';
import { HamburgerMenu } from '../../molecules/HamburgerMenu';

export const Header: React.FC = () => {
  const { isMobile } = useMediaQuery();
  return (
    <header className={styles.header}>
      {isMobile ? null : H1Element}
      <nav>
        {isMobile ? (
          <div className={styles.mobileH1TextLinkWrapper}>
            <a href="http://localhost:3000/">{H1Element}</a>
            <HamburgerMenu />
          </div>
        ) : (
          <div>
            <ul className={styles.ul}>
              {NAV_CONTENTS.map(({ children, ...rest }, index) => {
                return (
                  <li key={index}>
                    <LinkButton {...rest}>{children}</LinkButton>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

const H1Element = <Heading level={1}>HOTEL PLANISPHERE</Heading>;

const NAV_CONTENTS = [
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
] as const;
