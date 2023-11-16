import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DetailsData } from '../../../shared/types';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { getPokemonDetails } from '../../api/get-pokemon-details';
import { Loader } from '../loader/loader';
import './detailed-card.scss';
import { toggleDetailedLoader } from './detailed-loader-slice';

const initDetails = {
  name: '',
  image: '',
  abilities: [],
  types: [],
  height: '',
  weight: '',
  evolutionData: [],
};

export function DetailedCard() {
  const [details, setDetails] = useState<DetailsData>(initDetails);
  const isLoading = useAppSelector((state) => state.isDetailedLoading.value);
  const dispatch = useAppDispatch();
  const { detailsID: id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(toggleDetailedLoader(true));

    getPokemonDetails(Number(id)).then((result) => {
      setDetails(result);
      dispatch(toggleDetailedLoader(false));
    });
  }, [id, dispatch]);

  const closeModal = () => navigate(-1);

  if (isLoading) {
    return (
      <>
        <div className="details__overlay" onClick={closeModal}></div>
        <div className="details" data-testid="detailed-card">
          <Loader />
        </div>
      </>
    );
  } else if (details) {
    return (
      <>
        <div className="details__overlay" onClick={closeModal}></div>
        <div className="details" data-testid="detailed-card">
          <div onClick={() => navigate(-1)} className="details__btn-box">
            <button className="details__button">x</button>
          </div>
          <h2 className="details__name">{details.name}</h2>
          <img src={details.image} alt="" className="details__img" />
          <div className="details__table">
            <div className="details__column">
              <h3 className="details__title">Height</h3>
              <p className="details__text">{details.height}</p>
              <h3 className="details__title">Weight</h3>
              <p className="details__text">{details.weight}</p>
              <h3 className="details__title">Types</h3>
              <p className="details__text">{details.types}</p>
            </div>
            <div className="details__column">
              <h3 className="details__title">Ability</h3>
              {details.abilities.map(([name, text], index) => {
                return (
                  <div key={index} className="details__row">
                    <p className="details__text">{name}</p>
                    <span>{text}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <h3 className="details__evo-title">Stage of evolution</h3>
          <div className="details__evolution">
            {details.evolutionData.map(({ name, image }, index) => {
              return (
                <div key={index} className="details__evo-imagebox" title={name}>
                  <img src={image} alt={name} className="details__evo-image" />
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}
