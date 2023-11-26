import { useGetSearchParams } from './model/get-search-params';
import { SearchField } from './ui/search-field';
import React, { createContext, useState, ReactNode } from 'react';

interface SearchParams {
  searchTerm: string;
  itemQty: number;
}

interface Props {
  children?: ReactNode;
}

interface SearchContextType {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}

export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);

export default function Layout({ children }: Props) {
  const { searchTerm: initSearchTerm, itemQty: initItemQty } =
    useGetSearchParams();

  const [searchParams, setSearchParams] = useState({
    searchTerm: initSearchTerm,
    itemQty: initItemQty,
  });

  return (
    <>
      <SearchContext.Provider value={{ searchParams, setSearchParams }}>
        <header className="header">
          <SearchField />
        </header>
        <main>{children}</main>
      </SearchContext.Provider>
      <footer></footer>
    </>
  );
}
