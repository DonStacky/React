import { Button } from '../button';
import btnStyles from '../button/button.module.scss';
import styles from './pagination.module.scss';
import { useRouter } from 'next/router';

interface Props {
  currentPage: number;
  lastPage: number;
}

export const Pagination = ({ currentPage, lastPage }: Props) => {
  const router = useRouter();
  const { search, itemqty } = router.query;
  const searchTerm = search ?? '';
  const itemQty = itemqty ?? '';

  return (
    <div className={styles['pagination-box']}>
      <Button
        className={currentPage === 1 ? btnStyles['button--disable'] : ''}
        onClick={() =>
          router.push(`/page/1?search=${searchTerm}&itemqty=${itemQty}`)
        }
      >
        &lt;&lt;
      </Button>
      <Button
        className={currentPage === 1 ? btnStyles['button--disable'] : ''}
        onClick={() =>
          router.push(
            `/page/${currentPage - 1}?search=${searchTerm}&itemqty=${itemQty}`
          )
        }
      >
        &lt;
      </Button>
      <Button className={btnStyles['button--outcursor']}>
        {`${currentPage} of ${lastPage}`}
      </Button>
      <Button
        className={currentPage === lastPage ? btnStyles['button--disable'] : ''}
        onClick={() =>
          router.push(
            `/page/${currentPage + 1}?search=${searchTerm}&itemqty=${itemQty}`
          )
        }
      >
        &gt;
      </Button>
      <Button
        className={currentPage === lastPage ? btnStyles['button--disable'] : ''}
        onClick={() =>
          router.push(
            `/page/${lastPage}?search=${searchTerm}&itemqty=${itemQty}`
          )
        }
      >
        &gt;&gt;
      </Button>
    </div>
  );
};
