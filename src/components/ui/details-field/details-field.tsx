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
            {(resolvedDetails) => (
              <>
                <div onClick={() => navigate(-1)} className="details__btn-box">
                  <button className="details__button">x</button>
                </div>
                <h2>{resolvedDetails.name}</h2>
                <img
                  src={resolvedDetails.image}
                  alt=""
                  className="details__img"
                />
                <p>{resolvedDetails.abilities}</p>
                <p>{resolvedDetails.types}</p>
                <p>{resolvedDetails.height}</p>
                <p>{resolvedDetails.weight}</p>
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
