import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetSearchParams } from '../../model/get-search-params';
import './search-field.scss';
import { getURL } from '../../model/get-url';

export const SearchField = () => {
  const { searchTerm: initSearchTerm, itemQty: initItemQty } =
    useGetSearchParams();
  const [searchTerm, setsearchTerm] = useState(initSearchTerm);
  const [itemQty, setItemQty] = useState(initItemQty);
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setsearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(getURL(1, searchTerm, itemQty));
  };

  const handleChangeItemQty = (event: React.ChangeEvent<HTMLInputElement>) => {
    setItemQty(Number(event.target.value));
  };

  return (
    <form className="search-field__form container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-field__input"
        placeholder={'Enter to search'}
        autoComplete="off"
        value={searchTerm || ''}
        onChange={handleInputChange}
      />
      <div className="search-field__input--number">
        <input
          type="number"
          min="2"
          max="20"
          placeholder={`${itemQty || 8} items`}
          value={itemQty || ''}
          onChange={handleChangeItemQty}
        />
      </div>
      <button type="submit" className="search-field__button">
        Search
      </button>
    </form>
  );
};
