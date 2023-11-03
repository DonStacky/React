import { useParams } from 'react-router-dom';
import Pepe from 'image/pepe.webp';
import { getPokemonDetails } from '../../model/api/get-pokemon-details';
import './details-field.scss';

export function DetailsField() {
  const { detailsID } = useParams();
  getPokemonDetails(Number(detailsID));

  return (
    <div className="details">
      <h2>Name: Details {detailsID}</h2>
      <img src={Pepe} alt="" />
      <p>Ability</p>
      <p>Types</p>
      <p>Heigth</p>
      <p>Weigth</p>
    </div>
  );
}
