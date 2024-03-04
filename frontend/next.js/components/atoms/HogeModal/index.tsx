import { useState, FC } from 'react';

type Props = {
  hoge: boolean;
  fuga: boolean;
};

export const StateModal: FC<Props> = ({ hoge, fuga }) => {
  const [open] = useState(hoge && fuga);
  return (
    <div
      style={{
        color: 'red',
      }}
    >
      {open ? 'open' : 'close'}
    </div>
  );
};

export const ConstModal: FC<Props> = ({ hoge, fuga }) => {
  const open = hoge && fuga;
  return (
    <div
      style={{
        color: 'green',
      }}
    >
      {open ? 'open' : 'close'}
    </div>
  );
};
