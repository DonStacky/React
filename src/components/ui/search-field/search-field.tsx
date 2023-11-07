import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../../pages/app/App';
import { getURL } from '../../model/get-url';
import './search-field.scss';

export const SearchField = () => {
  const { searchParams, setSearchParams } = useContext(SearchContext);
  const { searchTerm, itemQty } = searchParams;
  const navigate = useNavigate();
  const [currentTerm, setCurrentTerm] = useState(searchTerm);
  const [currentItemQty, setCurrentItemQty] = useState(itemQty);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTerm(event.target.value.trim());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ searchTerm: currentTerm, itemQty: currentItemQty });
    navigate(getURL(1, currentTerm, currentItemQty));
  };

  const handleChangeItemQty = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItemQty(Number(event.target.value));
  };

  return (
    <form className="search-field__form container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-field__input"
        placeholder={'Enter to search'}
        autoComplete="off"
        value={currentTerm || ''}
        onChange={handleInputChange}
      />
      <div className="search-field__input--number">
        <input
          type="number"
          min="2"
          max="20"
          placeholder={`${currentItemQty || 8} items`}
          value={currentItemQty || ''}
          onChange={handleChangeItemQty}
        />
      </div>
      <button type="submit" className="search-field__button">
        Search
      </button>
    </form>
  );
};
