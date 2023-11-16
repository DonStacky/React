import { createContext, /* useContext, */ useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageData } from '../../../shared/types';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { getPageData } from '../../api/get-page-data';
import { CardList } from '../card/card-list';
import { Loader } from '../loader/loader';
import { Pagination } from '../pagination/pagination';
import { toggleMainLoader } from './main-loader-slice';
import './result-field.scss';

export const PageDataContext = createContext<PageData>({} as PageData);

export const ResultField = () => {
  const searchTerm = useAppSelector((state) => state.searchTerm.value);
  const itemQty = useAppSelector((state) => state.itemQty.value);
  const isLoading = useAppSelector((state) => state.isMainLoading.value);
  const dispatch = useAppDispatch();
  const [pageData, setPageData] = useState<PageData>({
    pageItems: [],
    lastPage: 1,
    currentPage: 1,
    itemQty: 0,
  });

  const { pageNumber } = useParams();

  useEffect(() => {
    dispatch(toggleMainLoader(true));

    getPageData(searchTerm, itemQty || 8, Number(pageNumber) || 1).then(
      (result) => {
        setPageData(result);
        dispatch(toggleMainLoader(false));
      }
    );
  }, [pageNumber, searchTerm, itemQty, dispatch]);

  if (isLoading) {
    return <Loader />;
  } else if (pageData.pageItems.length) {
    return (
      <>
        <div className="container">
          <PageDataContext.Provider value={pageData}>
            <CardList />
            <Pagination />
          </PageDataContext.Provider>
        </div>
      </>
    );
  } else {
    return <p className="bad-request">Nothing was found for your request...</p>;
  }
};
