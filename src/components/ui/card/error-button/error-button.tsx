import { useState } from 'react';
import { Button } from '../../button/button';

export const ErrorButton = () => {
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error();
  } else {
    return (
      <Button onClick={handleClick} className="button--error">
        Error
      </Button>
    );
  }
};
