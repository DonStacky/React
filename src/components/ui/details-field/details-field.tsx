import {
  useLoaderData,
  LoaderFunctionArgs,
  defer,
  Await,
  useNavigate,
} from 'react-router-dom';
import { getPokemonDetails } from '../../model/api/get-pokemon-details';
import { DetailsData } from '../../../shared/types';
import './details-field.scss';
import { Loader } from '../loader/loader';
import { Suspense } from 'react';

type LoaderData = {
  details: DetailsData;
};

export function DetailsField() {
  const { details } = useLoaderData() as LoaderData;
  const navigate = useNavigate();

  return (
    <>
      <div className="details__overlay" onClick={() => navigate(-1)}></div>
      <div className="details">
        <Suspense fallback={<Loader />}>
          <Await resolve={details}>
            {(resolvedDetails: DetailsData) => (
              <>
                <div onClick={() => navigate(-1)} className="details__btn-box">
                  <button className="details__button">x</button>
                </div>
                <h2 className="details__name">{resolvedDetails.name}</h2>
                <img
                  src={resolvedDetails.image}
                  alt=""
                  className="details__img"
                />
                <div className="details__table">
                  <div className="details__column">
                    <h3 className="details__title">Height</h3>
                    <p className="details__text">{resolvedDetails.height}</p>
                    <h3 className="details__title">Weight</h3>
                    <p className="details__text">{resolvedDetails.weight}</p>
                    <h3 className="details__title">Types</h3>
                    <p className="details__text">{resolvedDetails.types}</p>
                  </div>
                  <div className="details__column">
                    <h3 className="details__title">Ability</h3>
                    {resolvedDetails.abilities.map(([name, text], index) => {
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
                  {resolvedDetails.evolutionData.map(
                    ({ name, image }, index) => {
                      return (
                        <div
                          key={index}
                          className="details__evo-imagebox"
                          title={name}
                        >
                          <img
                            src={image}
                            alt={name}
                            className="details__evo-image"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </>
  );
}

export const detailsLoader = async ({ params }: LoaderFunctionArgs<string>) => {
  return defer({ details: getPokemonDetails(Number(params.detailsID)) });
};
