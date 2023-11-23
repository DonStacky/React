import clsx from 'clsx';
import { MouseEventHandler } from 'react';
import styles from './button.module.scss';

type Props = {
  onClick?: MouseEventHandler;
  className?: string;
  children?: string;
};

export const Button = ({ onClick, className, children }: Props) => {
  return (
    <button onClick={onClick} className={clsx(styles.button, className)}>
      {children}
    </button>
  );
};
