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
