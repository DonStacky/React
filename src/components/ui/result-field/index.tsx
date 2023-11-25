import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PageData, DetailsData } from '../../../shared/types';
import { CardList } from '../card-list';
import styles from '../card-list/card-list.module.scss';
import { DetailedCard } from '../detailed-card';
import { Loader } from '../loader';
import { Pagination } from '../pagination/pagination';

interface Props {
  pageData: PageData;
  detailsData?: DetailsData;
}

export const ResultField = ({ pageData, detailsData }: Props) => {
  const { pageItems, currentPage, lastPage } = pageData;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      url !== router.asPath && setIsLoading(true);
    };
    const handleComplete = (url: string) =>
      url === router.asPath && setIsLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.asPath, router.events, setIsLoading]);

  if (isLoading) {
    return <Loader />;
  } else if (pageData?.pageItems.length) {
    return (
      <>
        <div className="container">
          <CardList currentPage={currentPage} pageItems={pageItems} />
          <Pagination
            lastPage={Number(lastPage)}
            currentPage={Number(currentPage)}
          />
          {detailsData && <DetailedCard detailsData={detailsData} />}
        </div>
      </>
    );
  } else {
    return (
      <p className={styles['bad-request']}>
        Nothing was found for your request...
      </p>
    );
  }
};
