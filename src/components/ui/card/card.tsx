import { ErrorBoundary } from '../../model/error-boundary';
import { ErrorButton } from './error-button/error-button';
import './card.scss';

type CardProps = {
  name: string;
  description: string;
  image: string;
};

export const Card = ({ name, description, image }: CardProps) => {
  return (
    <ErrorBoundary>
      <div className="card">
        <div className="card__imgbox">
          <img className="card__img" src={image} alt={name} />
        </div>
        <h3 className="card__title">{name}</h3>
        <p className="card__text">{description}</p>
        <ErrorButton />
      </div>
    </ErrorBoundary>
  );
};
