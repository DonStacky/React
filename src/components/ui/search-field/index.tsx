import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './search-field.module.scss';
import { useRouter, useSearchParams } from 'next/navigation';

export const SearchField = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('search');
  const itemqty = searchParams.get('itemqty');
  const [currentTerm, setCurrentTerm] = useState(search ?? '');
  const [currentItemQty, setCurrentItemQty] = useState(itemqty ?? 8);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTerm(event.target.value.trim());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(
      `/page/1?search=${currentTerm}&itemqty=${currentItemQty || ''}`
    );
  };

  const handleChangeItemQty = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItemQty(Number(event.target.value));
  };

  return (
    <form
      className={clsx(styles['search-field__form'], styles.container)}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className={styles['search-field__input']}
        placeholder={'Enter to search'}
        autoComplete="off"
        value={currentTerm || ''}
        onChange={handleInputChange}
      />
      <div className={styles['search-field__input--number']}>
        <input
          type="number"
          min="2"
          max="20"
          placeholder={`${currentItemQty || 8} items`}
          value={currentItemQty || ''}
          onChange={handleChangeItemQty}
        />
      </div>
      <button type="submit" className={styles['search-field__button']}>
        Search
      </button>
    </form>
  );
};
