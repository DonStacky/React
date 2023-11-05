import image from 'image/not-found.png';
import './not-found.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="not-found container">
      <img src={image} alt="not-found" className="not-found__image" />
      <div className="not-found__message">
        <h1 className="not-found__title">Sorry!</h1>
        <p className="not-found__text">The page not found</p>
        <p className="not-found__text">
          Go{' '}
          <a className="not-found__link" onClick={handleClick}>
            Back
          </a>{' '}
          or go{' '}
          <Link to="/" className="not-found__link">
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};
