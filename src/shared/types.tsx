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
  types: string[];
  height: string;
  weight: string;
  evolutionData: EvolutionData[];
};
