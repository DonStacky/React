import { ErrorBoundary } from '../../model/error-boundary';
import { ErrorButton } from './error-button/error-button';
import { useNavigate } from 'react-router-dom';
import './card.scss';

type CardProps = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export const Card = ({ id, name, description, image }: CardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`details/${id}`);
  };

  return (
    <ErrorBoundary>
      <div className="card" onClick={handleClick}>
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
