import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { PageDataContext } from '../result-field/result-field';
import { Card } from './card';

export const CardList = () => {
  const { pageItems, currentPage } = useContext(PageDataContext);

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
