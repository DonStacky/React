import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getURL } from '../../model/get-url';
import { Button } from '../button/button';
import { PageDataContext } from '../result-field/result-field';
import './pagination.scss';
import { useAppSelector } from '../../../store/hook';

export const Pagination = () => {
  const navigate = useNavigate();
  const searchTerm = useAppSelector((state) => state.searchTerm.value);
  const itemQty = useAppSelector((state) => state.itemQty.value);
  const { currentPage, lastPage } = useContext(PageDataContext);

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
