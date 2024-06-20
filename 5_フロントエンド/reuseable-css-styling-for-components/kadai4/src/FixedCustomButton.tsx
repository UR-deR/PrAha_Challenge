import React from 'react';
import styles from './FixedCustomButton.module.css';

type Props = {
  children: string;
  onClick: () => void;
  disabled?: boolean;
  color?: 'red' | 'blue' | 'green';
};

const DEFAULT_BUTTON_COLOR = 'blue';

const getBgColorByProps = (color: Props['color'], disabled: Props['disabled']) => {
  if (disabled) {
    return styles['bg-gray'];
  }
  return styles[`bg-${color ?? DEFAULT_BUTTON_COLOR}`];
};

export const FixedCustomButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled ?? false}
      className={`${styles.baseStyle} ${getBgColorByProps(props.color, props.disabled)}`}
    >
      {props.children}
    </button>
  );
};
