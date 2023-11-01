export type PokemonData = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export type PageData = {
  pageItems: PokemonData[];
  pagesQty: number;
  currentPage: number;
};

export type ResultData = {
  name: string;
  url: string;
};
