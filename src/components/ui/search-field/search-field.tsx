import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { getURL } from '../../model/get-url';
import { setItemQty } from './itemqty-slice';
import './search-field.scss';
import { setSearchTerm } from './searchterm-slice';

export const SearchField = () => {
  const searchTerm = useAppSelector((state) => state.searchTerm.value);
  const itemQty = useAppSelector((state) => state.itemQty.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [currentTerm, setCurrentTerm] = useState(searchTerm);
  const [currentItemQty, setCurrentItemQty] = useState(itemQty);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTerm(event.target.value.trim());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(setSearchTerm(currentTerm));
    dispatch(setItemQty(currentItemQty));
    navigate(getURL(1, currentTerm, currentItemQty));
    localStorage.setItem('searchTermRSG', currentTerm);
    localStorage.setItem('itemQtyRSG', String(currentItemQty));
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
