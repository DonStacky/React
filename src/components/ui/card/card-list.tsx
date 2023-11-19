import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../../store/hook';
import { Card } from './card';

export const CardList = () => {
  const pageData = useAppSelector((state) => state.pageData.value);
  const { pageItems, currentPage } = pageData;

  return (
    <div className="result-field" data-testid="card-list">
      {pageItems.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          name={item.name}
          description={item.description}
          image={item.image}
          page={currentPage}
        />
      ))}
      <Outlet />
    </div>
  );
};
