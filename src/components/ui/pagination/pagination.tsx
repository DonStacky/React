import { useNavigate } from 'react-router-dom';
import { useGetSearchParams } from '../../model/get-search-params';
import { Button } from '../button/button';
import './pagination.scss';

type Props = {
  currentPage: number;
  lastPage: number;
};

export const Pagination = ({ currentPage, lastPage }: Props) => {
  const navigate = useNavigate();
  const [search, itemQty] = useGetSearchParams();

  return (
    <div className="pagination-box">
      <Button
        onClick={() => navigate(`/page/1?search=${search}&itemqty=${itemQty}`)}
        className={currentPage === 1 ? 'button--disable' : ''}
      >
        &lt;&lt;
      </Button>
      <Button
        onClick={() =>
          navigate(
            `/page/${currentPage - 1}?search=${search}&itemqty=${itemQty}`
          )
        }
        className={currentPage === 1 ? 'button--disable' : ''}
      >
        &lt;
      </Button>
      <Button className="button--outcursor">
        {`${currentPage} of ${lastPage}`}
      </Button>
      <Button
        onClick={() =>
          navigate(
            `/page/${currentPage + 1}?search=${search}&itemqty=${itemQty}`
          )
        }
        className={currentPage === lastPage ? 'button--disable' : ''}
      >
        &gt;
      </Button>
      <Button
        onClick={() =>
          navigate(`/page/${lastPage}?search=${search}&itemqty=${itemQty}`)
        }
        className={currentPage === lastPage ? 'button--disable' : ''}
      >
        &gt;&gt;
      </Button>
    </div>
  );
};
