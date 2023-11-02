import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './search-field.scss';

export const SearchField = () => {
  // let initTerm = '';
  // const localTerm = localStorage.getItem('searchTermRSG');
  // if (localTerm) initTerm = localTerm;

  // const [itemQty, setItemQty] = useState(8);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('search'));

  // const handleButtonClick = (event: React.FormEvent<HTMLButtonElement>) => {
  //   event.preventDefault();
  //   console.log(itemQty);
  //   // search(searchTerm, itemQty);
  // };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSearchParams({ search: inputValue ?? '' });
  };

  // const handleChangeItemQty = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newPageQty =
  //     Number(event.target.value) > 20
  //       ? 20
  //       : Number(event.target.value) < 2
  //       ? 2
  //       : Number(event.target.value);

  //   // setItemQty(newPageQty);
  // };

  return (
    <form className="search-field__form container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-field__input"
        placeholder={'Enter to search'}
        autoComplete="off"
        value={inputValue || ''}
        onChange={handleInputChange}
      />
      <div className="search-field__input--number">
        <input
          type="number"
          min="2"
          max="20"
          title="2 ... 20"
          placeholder={`${/* curretnItemQty */ 8} items`}
          // onChange={handleChangeItemQty}
        />
      </div>
      <button
        type="submit"
        className="search-field__button"
        // onClick={handleButtonClick}
      >
        Search
      </button>
    </form>
  );
};
