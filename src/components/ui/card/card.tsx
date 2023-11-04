import { ErrorBoundary } from '../../model/error-boundary';
import { ErrorButton } from './error-button/error-button';
import { useNavigate } from 'react-router-dom';
import './card.scss';

type CardProps = {
  id: number;
  name: string;
  description: string;
  image: string;
  page: number;
};

export const Card = ({ id, name, description, image, page }: CardProps) => {
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'BUTTON') return;

    navigate(`/page/${page}/details/${id}`);
  };

  return (
    <ErrorBoundary page={page}>
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
