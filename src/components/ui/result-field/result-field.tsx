import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { PageData } from '../../../shared/types';
import { getPageData } from '../../model/api/get-page-data';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';
import { NotFound } from '../not-found/not-found';
import { Pagination } from '../pagination/pagination';
import './result-field.scss';

export const ResultField = () => {
  const searchTerm = useLocation().search.split('=')[1]; //TODO change anything

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
    getPageData(searchTerm || '', 8, Number(pageNumber) || 1).then((result) => {
      setPageData(result);
      setIsLoading(false);
    });
  }, [pageNumber, searchTerm]);

  if (isLoading) {
    return <Loader />;
  } else if (pageData.pageItems.length) {
    return (
      <div className="container">
        <div className="result-field">
          {pageData.pageItems.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
        <Pagination
          currentPage={pageData.currentPage}
          lastPage={pageData.lastPage}
        ></Pagination>
      </div>
    );
  } else {
    return <NotFound />;
  }
};
