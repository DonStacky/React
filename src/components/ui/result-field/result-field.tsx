import { useContext, useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { SearchContext } from '../../../pages/app/App';
import { PageData } from '../../../shared/types';
import { getPageData } from '../../api/get-page-data';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';
import { Pagination } from '../pagination/pagination';
import './result-field.scss';

export const ResultField = () => {
  const { searchParams } = useContext(SearchContext);
  const { searchTerm, itemQty } = searchParams;

  const [isLoading, setIsLoading] = useState(true);
  const [pageData, setPageData] = useState<PageData>({
    pageItems: [],
    lastPage: 1,
    currentPage: 1,
    itemQty: 0,
  });

  const { pageNumber } = useParams();

  useEffect(() => {
    setIsLoading(true);

    getPageData(searchTerm, itemQty || 8, Number(pageNumber) || 1).then(
      (result) => {
        setPageData(result);
        setIsLoading(false);
      }
    );

    localStorage.setItem('queryDataRSG', `${searchTerm}&${itemQty}`);
  }, [pageNumber, searchTerm, itemQty]);

  if (isLoading) {
    return <Loader />;
  } else if (pageData.pageItems.length) {
    return (
      <>
        <div className="container">
          <div className="result-field">
            {pageData.pageItems.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                image={item.image}
                page={pageData.currentPage}
              />
            ))}
            <Outlet />
          </div>
          <Pagination
            currentPage={pageData.currentPage}
            lastPage={pageData.lastPage}
          ></Pagination>
        </div>
      </>
    );
  } else {
    return <p className="bad-request">Nothing was found for your request...</p>;
  }
};
