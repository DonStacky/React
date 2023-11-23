import { useState } from 'react';
import { Button } from '../button';
import styles from '../button/button.module.scss';

export const ErrorButton = () => {
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error();
  } else {
    return (
      <Button onClick={handleClick} className={styles['button--error']}>
        Error
      </Button>
    );
  }
};
