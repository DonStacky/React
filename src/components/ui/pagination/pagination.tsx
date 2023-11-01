import { Button } from '../button/button';
import './pagination.scss';

type Props = {
  currentPage: number;
  lastPage: number;
  changePage: (destination: string) => void;
};

export const Pagination = ({ currentPage, lastPage, changePage }: Props) => {
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
        {`${currentPage} of ${lastPage}`}
      </Button>
      <Button
        onClick={() => handleClick('nextPage')}
        className={currentPage === lastPage ? 'button--disable' : ''}
      >
        &gt;
      </Button>
      <Button
        onClick={() => handleClick('lastPage')}
        className={currentPage === lastPage ? 'button--disable' : ''}
      >
        &gt;&gt;
      </Button>
    </div>
  );
};
