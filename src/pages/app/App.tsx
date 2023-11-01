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
    lastPage: 1,
    currentPage: 1,
    itemQty: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const localTerm = localStorage.getItem('searchTermRSG');

    const [localItemQty, localCurrentPage] = localStorage
      .getItem('pageDataRSG')
      ?.split(',') || [8, 1];

    searchPokemons(localTerm ?? '', +localItemQty, +localCurrentPage);
  }, []);

  const searchPokemons = (searchTerm: string, itemQty = 8, page = 1) => {
    setIsLoading(false);
    getPageData(searchTerm, itemQty, page).then((result) => {
      localStorage.setItem('searchTermRSG', searchTerm);
      localStorage.setItem('pageDataRSG', [itemQty, page].join(','));
      setIsLoading(true);
      setPageData(result);
    });
  };

  const changePage = (destination: string) => {
    const localTerm = localStorage.getItem('searchTermRSG');

    const newCurrentPage = switchPage(pageData, destination);

    searchPokemons(localTerm ?? '', pageData.itemQty, newCurrentPage);
  };

  return (
    <>
      <header className="header">
        <SearchField
          search={searchPokemons}
          curretnItemQty={pageData.itemQty}
        />
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
