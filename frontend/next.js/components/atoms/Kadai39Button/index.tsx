import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
  color: 'red' | 'blue' | 'green';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
  onClick: () => void;
};

const getBgColor = (color: Props['color'], disabled: Props['disabled']) => {
  if (disabled) {
    return 'bg-gray';
  }
  return `bg-${color}`;
};

const size: {
  [key in Props['size']]: string;
} = {
  small: 'size-sm',
  medium: 'size-md',
  large: 'size-lg',
} as const;

export const Kadai39Button: React.FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`${styles[getBgColor(props.color, props.disabled)]} ${styles[size[props.size]]}`}
    >
      {props.children}
    </button>
  );
};
