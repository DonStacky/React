import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store/hook';
import { getURL } from '../../model/get-url';
import { Button } from '../button/button';
import './pagination.scss';

export const Pagination = () => {
  const navigate = useNavigate();
  const searchTerm = useAppSelector((state) => state.searchTerm.value);
  const itemQty = useAppSelector((state) => state.itemQty.value);
  const pageData = useAppSelector((state) => state.pageData.value);
  const { lastPage, currentPage } = pageData;

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
