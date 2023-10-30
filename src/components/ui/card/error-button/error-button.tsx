import { useState } from 'react';
import './error-button.scss';

export const ErrorButton = () => {
  const [isError, setIsError] = useState(false);

  const handleClick = () => {
    setIsError(true);
  };

  if (isError) {
    throw new Error();
  } else {
    return (
      <button className="error-button" onClick={handleClick}>
        Error
      </button>
    );
  }
};
