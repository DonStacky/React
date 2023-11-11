import { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ErrorBoundary } from '../../model/error-boundary';
import { PageDataContext } from '../result-field/result-field';
import './card.scss';
import { ErrorButton } from './error-button/error-button';

type CardProps = {
  id: number;
  name: string;
  description: string;
  image: string;
  page: number;
};

export const Card = ({ id, name, description, image, page }: CardProps) => {
  return (
    <ErrorBoundary page={page}>
      <div className="card" data-testid="card">
        <Link to={`/page/${page}/details/${id}`}>
          <div className="card__imgbox">
            <img className="card__img" src={image} alt={name} />
          </div>
          <h3 className="card__title">{name}</h3>
          <p className="card__text">{description}</p>
        </Link>
        <ErrorButton />
      </div>
    </ErrorBoundary>
  );
};

export const Cards = () => {
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
