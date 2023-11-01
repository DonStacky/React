import { useState } from 'react';
import './search-field.scss';

type Props = {
  search: (searchTerm: string, itemQty: number) => void;
  curretnItemQty: number;
};

export const SearchField = ({ search, curretnItemQty }: Props) => {
  let initTerm = '';
  const localTerm = localStorage.getItem('searchTermRSG');
  if (localTerm) initTerm = localTerm;

  const [searchTerm, setSearchTerm] = useState(initTerm);
  const [itemQty, setItemQty] = useState(8);

  const handleButtonClick = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(itemQty);
    search(searchTerm, itemQty);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleChangeItemQty = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPageQty =
      Number(event.target.value) > 20
        ? 20
        : Number(event.target.value) < 2
        ? 2
        : Number(event.target.value);

    setItemQty(newPageQty);
  };

  return (
    <form className="search-field__form container">
      <input
        type="text"
        className="search-field__input"
        placeholder={'Enter to search'}
        value={searchTerm}
        onChange={handleInputChange}
      />
      <div className="search-field__input--number">
        <input
          type="number"
          min="2"
          max="20"
          title="2 ... 20"
          placeholder={`${curretnItemQty} items`}
          onChange={handleChangeItemQty}
        />
      </div>
      <button className="search-field__button" onClick={handleButtonClick}>
        Search
      </button>
    </form>
  );
};
