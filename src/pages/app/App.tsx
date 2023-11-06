import { Outlet } from 'react-router-dom';
import { createContext, useState } from 'react';
import { SearchField } from '../../components/ui/search-field/search-field';
import './app.scss';
import { useGetSearchParams } from '../../components/model/get-search-params';

interface SearchParams {
  searchTerm: string;
  itemQty: number;
}

interface SearchContextType {
  searchParams: SearchParams;
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
}
export const SearchContext = createContext<SearchContextType>(
  {} as SearchContextType
);

export const App = () => {
  const { searchTerm: initSearchTerm, itemQty: initItemQty } =
    useGetSearchParams();
  const [searchParams, setSearchParams] = useState({
    searchTerm: initSearchTerm,
    itemQty: initItemQty,
  });

  return (
    <>
      <header className="header">
        <SearchContext.Provider value={{ searchParams, setSearchParams }}>
          <SearchField />
        </SearchContext.Provider>
      </header>
      <main>
        <SearchContext.Provider value={{ searchParams, setSearchParams }}>
          <Outlet />
        </SearchContext.Provider>
      </main>
      <footer></footer>
    </>
  );
};
