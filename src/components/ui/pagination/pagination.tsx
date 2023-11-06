import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../../pages/app/App';
import { getURL } from '../../model/get-url';
import { Button } from '../button/button';
import './pagination.scss';

type Props = {
  currentPage: number;
  lastPage: number;
};

export const Pagination = ({ currentPage, lastPage }: Props) => {
  const navigate = useNavigate();
  const { searchParams } = useContext(SearchContext);
  const { searchTerm, itemQty } = searchParams;

  return (
    <div className="pagination-box">
      <Button
        onClick={() => navigate(getURL(1, searchTerm, itemQty))}
        className={currentPage === 1 ? 'button--disable' : ''}
      >
        &lt;&lt;
      </Button>
      <Button
        onClick={() => navigate(getURL(currentPage - 1, searchTerm, itemQty))}
        className={currentPage === 1 ? 'button--disable' : ''}
      >
        &lt;
      </Button>
      <Button className="button--outcursor">
        {`${currentPage} of ${lastPage}`}
      </Button>
      <Button
        onClick={() => navigate(getURL(currentPage + 1, searchTerm, itemQty))}
        className={currentPage === lastPage ? 'button--disable' : ''}
      >
        &gt;
      </Button>
      <Button
        onClick={() => navigate(getURL(lastPage, searchTerm, itemQty))}
        className={currentPage === lastPage ? 'button--disable' : ''}
      >
        &gt;&gt;
      </Button>
    </div>
  );
};
