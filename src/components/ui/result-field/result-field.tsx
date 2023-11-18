import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { CardList } from '../card/card-list';
import { Loader } from '../loader/loader';
import { Pagination } from '../pagination/pagination';
import { toggleMainLoader } from './main-loader-slice';
import './result-field.scss';
import { useGetPokemonsQuery } from '../../api/pokeapi';
import { setPageData } from './page-data-slice';

export const ResultField = () => {
  const pageData = useAppSelector((state) => state.pageData.value);
  const searchTerm = useAppSelector((state) => state.searchTerm.value);
  const itemQty = useAppSelector((state) => state.itemQty.value);
  const isMainLoading = useAppSelector((state) => state.isMainLoading.value);
  const { pageNumber } = useParams();
  const dispatch = useAppDispatch();

  const {
    data: newPageData,
    isLoading,
    isFetching,
  } = useGetPokemonsQuery({
    searchTerm,
    itemQty,
    currentPage: Number(pageNumber) || 1,
  });

  useEffect(() => {
    if (newPageData) dispatch(setPageData(newPageData));
    dispatch(toggleMainLoader(isLoading || isFetching));
  }, [newPageData, dispatch, isLoading, isFetching]);

  if (isMainLoading) {
    return <Loader />;
  } else if (pageData.pageItems.length) {
    return (
      <>
        <div className="container">
          <CardList />
          <Pagination />
        </div>
      </>
    );
  } else {
    return <p className="bad-request">Nothing was found for your request...</p>;
  }
};
