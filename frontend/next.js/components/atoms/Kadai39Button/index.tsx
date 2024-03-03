import styles from './styles.module.scss';

type Props = {
  children: string;
  color?: 'red' | 'blue' | 'green';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick: () => void;
};

const getBgColor = (color: Props['color'], disabled: Props['disabled']) => {
  if (disabled) {
    return 'bg-gray';
  }
  return `bg-${color}`;
};

const size: {
  [key in Exclude<Props['size'], undefined>]: string;
} = {
  small: 'size-sm',
  medium: 'size-md',
  large: 'size-lg',
} as const;

export const Kadai39Button: React.FC<Props> = (props) => {
  const DEFAULT_SIZE = 'medium';
  const DEFAULT_DISABLED = false;
  const disabled = props.disabled ?? DEFAULT_DISABLED;
  const COLOR = props.color ?? 'blue';

  return (
    <button
      onClick={props.onClick}
      disabled={disabled}
      className={`${styles[getBgColor(COLOR, disabled)]} ${styles[size[props.size ?? DEFAULT_SIZE]]}`}
    >
      {props.children}
    </button>
  );
};
