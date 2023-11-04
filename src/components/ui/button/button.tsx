import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import './button.scss';

type Props = {
  onClick?: MouseEventHandler;
  className?: string;
  children?: string;
};

export const Button = ({ onClick, className, children }: Props) => {
  return (
    <button onClick={onClick} className={clsx('button', className)}>
      {children}
    </button>
  );
};
