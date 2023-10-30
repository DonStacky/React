import { useState } from 'react';
import './search-field.scss';

type Props = {
  search: (searchTerm: string) => void;
};

export const SearchField = ({ search }: Props) => {
  let initTerm = '';
  const localTerm = localStorage.getItem('searchTermRSG');
  if (localTerm) initTerm = localTerm;

  const [searchTerm, setSearchTerm] = useState(initTerm);

  const handleButtonClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    search(searchTerm);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <form className="search-field__form container">
      <input
        type="text"
        className="search-field__input"
        placeholder={'Enter to search'}
        value={searchTerm}
        onChange={(event) => handleInputChange(event)}
      />
      <button
        className="search-field__button"
        onClick={(event) => handleButtonClick(event)}
      >
        Search
      </button>
    </form>
  );
};
