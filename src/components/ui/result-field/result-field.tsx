import { PageData } from '../../../shared/types';
import { Card } from '../card/card';
import { Loader } from '../loader/loader';
import { NotFound } from '../not-found/not-found';
import { Pagination } from '../pagination/pagination';
import './result-field.scss';

type Props = {
  pageData: PageData;
  loader: boolean;
  changePage: (description: string) => void;
};

export const ResultField = ({ pageData, loader, changePage }: Props) => {
  const onPaginate = (destination: string) => {
    changePage(destination);
  };

  if (!loader) {
    return <Loader />;
  } else if (pageData.pageItems.length) {
    return (
      <div className="container">
        <div className="result-field">
          {pageData.pageItems.map((item) => (
            <Card
              key={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
        <Pagination
          currentPage={pageData.currentPage}
          lastPage={pageData.lastPage}
          changePage={onPaginate}
        ></Pagination>
      </div>
    );
  } else {
    return <NotFound />;
  }
};
