import loaderImg from 'image/pokeball.png';
import './loader.scss';

export const Loader = () => {
  return (
    <div className="loader">
      <img src={loaderImg} alt="pokeball-loader" />
    </div>
  );
};
