import { Button } from '../button/button';
import './pagination.scss';

type Props = {
  currentPage: number;
  pagesQty: number;
  changePage: (destination: string) => void;
};

export const Pagination = ({ currentPage, pagesQty, changePage }: Props) => {
  const handleClick = (destination: string) => {
    changePage(destination);
  };

  return (
    <div className="pagination-box">
      <Button
        onClick={() => handleClick('firstPage')}
        className={currentPage === 1 ? 'button--disable' : ''}
      >
        &lt;&lt;
      </Button>
      <Button
        onClick={() => handleClick('prevPage')}
        className={currentPage === 1 ? 'button--disable' : ''}
      >
        &lt;
      </Button>
      <Button className="button--outcursor">
        {`${currentPage} of ${pagesQty}`}
      </Button>
      <Button
        onClick={() => handleClick('nextPage')}
        className={currentPage === pagesQty ? 'button--disable' : ''}
      >
        &gt;
      </Button>
      <Button
        onClick={() => handleClick('lastPage')}
        className={currentPage === pagesQty ? 'button--disable' : ''}
      >
        &gt;&gt;
      </Button>
    </div>
  );
};
