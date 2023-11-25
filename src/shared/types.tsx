export type PokemonData = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type PageData = {
  pageItems: PokemonData[];
  lastPage: number;
  currentPage: number;
  itemQty: number;
};

export type ResultData = {
  name: string;
  url: string;
};

type EvolutionData = {
  name: string;
  image: string;
};

export type DetailsData = {
  name: string;
  image: string;
  abilities: string[][];
  types: string;
  height: string;
  weight: string;
  evolutionData: EvolutionData[];
};

export type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  name: string;
  height: number;
  weight: number;
  sprites: { other: { 'official-artwork': { front_default: string } } };
  types: { type: { name: string } }[];
  id: number;
  species: { name: string; url: string };
};
