import React from 'react';

type Props = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
};

export const Heading: React.FC<Props> = (props) => {
  return <>{React.createElement(`h${props.level}`, {}, props.children)}</>;
};
