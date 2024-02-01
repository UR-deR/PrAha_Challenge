import React from 'react';
import styles from './styles.module.css';

type Props = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 'normal' | 'bold';
};

export const Heading: React.FC<Props> = (props) => {
  return (
    <>
      {React.createElement(
        `h${props.level}`,
        {
          className: `fontWeight${props.fontWeight ?? 'bold'}`,
        },
        props.children
      )}
    </>
  );
};
