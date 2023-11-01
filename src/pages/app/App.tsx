import { useEffect, useState } from 'react';
import { getPageData } from '../../components/model/api/get-page-data';
import { switchPage } from '../../components/model/switch-page';
import { ResultField } from '../../components/ui/result-field/result-field';
import { SearchField } from '../../components/ui/search-field/search-field';
import { PageData } from '../../shared/types';
import './app.scss';

export const App = () => {
  const [pageData, setPageData] = useState<PageData>({
    pageItems: [],
    pagesQty: 1,
    currentPage: 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const localTerm = localStorage.getItem('searchTermRSG');
    const localPage = Number(localStorage.getItem('currentPageRSG')) || 1;
    searchPokemons(localTerm ?? '', localPage);
  }, []);

  const searchPokemons = (searchTerm: string, page = 1) => {
    setIsLoading(false);
    getPageData(searchTerm, page).then((result) => {
      localStorage.setItem('searchTermRSG', searchTerm);
      localStorage.setItem('currentPageRSG', String(page));
      setIsLoading(true);
      setPageData(result);
    });
  };

  const changePage = (destination: string) => {
    const localTerm = localStorage.getItem('searchTermRSG');

    const newCurrentPage = switchPage(pageData, destination);

    searchPokemons(localTerm ?? '', newCurrentPage);
  };

  return (
    <>
      <header className="header">
        <SearchField search={searchPokemons} />
      </header>
      <main>
        <ResultField
          pageData={pageData}
          loader={isLoading}
          changePage={changePage}
        />
      </main>
      <footer></footer>
    </>
  );
};
