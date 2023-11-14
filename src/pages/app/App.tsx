// import { createContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
// import { useGetSearchParams } from '../../components/model/get-search-params';
import { SearchField } from '../../components/ui/search-field/search-field';
import './app.scss';

// interface SearchParams {
//   searchTerm: string;
//   itemQty: number;
// }

// interface SearchContextType {
//   searchParams: SearchParams;
//   setSearchParams: React.Dispatch<React.SetStateAction<SearchParams>>;
// }

// export const SearchContext = createContext<SearchContextType>(
//   {} as SearchContextType
// );

export const App = () => {
  // const searchTerm = useGetSearchParams('searchParam');
  // const [searchParams, setSearchParams] = useState({
  //   searchTerm: initSearchTerm,
  //   itemQty: initItemQty,
  // });

  return (
    <>
      {/* <SearchContext.Provider value={{ searchParams, setSearchParams }}> */}
      <header className="header">
        <SearchField />
      </header>
      <main>
        <Outlet />
      </main>
      {/* </SearchContext.Provider> */}
      <footer></footer>
    </>
  );
};
