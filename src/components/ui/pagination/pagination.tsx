import { useNavigate } from 'react-router-dom';
import { Button } from '../button/button';
import './pagination.scss';

type Props = {
  currentPage: number;
  lastPage: number;
};

export const Pagination = ({ currentPage, lastPage }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="pagination-box">
      <Button
        onClick={() => navigate('/page/1')}
        className={currentPage === 1 ? 'button--disable' : ''}
      >
        &lt;&lt;
      </Button>
      <Button
        onClick={() => navigate(`/page/${currentPage - 1}`)}
        className={currentPage === 1 ? 'button--disable' : ''}
      >
        &lt;
      </Button>
      <Button className="button--outcursor">
        {`${currentPage} of ${lastPage}`}
      </Button>
      <Button
        onClick={() => navigate(`/page/${currentPage + 1}`)}
        className={currentPage === lastPage ? 'button--disable' : ''}
      >
        &gt;
      </Button>
      <Button
        onClick={() => navigate(`/page/${lastPage}`)}
        className={currentPage === lastPage ? 'button--disable' : ''}
      >
        &gt;&gt;
      </Button>
    </div>
  );
};
