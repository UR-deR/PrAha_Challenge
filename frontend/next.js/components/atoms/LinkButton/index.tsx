import styles from './styles.module.css';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'text' | 'outlined';
};

export const LinkButton: React.FC<Props> = (props) => {
  const className = {
    text: styles.text,
    outlined: styles.outlined,
  } as const;

  return (
    <a href={props.href} className={className[props.variant ?? 'outlined']}>
      {props.children}
    </a>
  );
};
