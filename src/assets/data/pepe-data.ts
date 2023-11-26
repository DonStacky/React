import Pepe from 'public/image/pepe.webp';
import PepeSmall from 'public/image/pepe1.webp';
import Cap from 'public/image/pepeCap.webp';
import Joker from 'public/image/pepeJoker.webp';
import { DetailsData } from '../../shared/types';

export const pepeData: DetailsData = {
  name: 'pepoClown',
  image: Pepe,
  abilities: [
    ['Bup', 'Nose changes color when pressed'],
    ['Honk', 'Make honk'],
  ],
  types: 'memes',
  height: '1 m',
  weight: '40 kg',
  evolutionData: [
    { name: 'pepeCap', image: Cap },
    { name: 'pepoClown', image: PepeSmall },
    { name: 'pepeJoker', image: Joker },
  ],
};
