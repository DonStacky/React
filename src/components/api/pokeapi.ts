import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResultData } from '../../shared/types';

const baseUrl = 'https://pokeapi.co/api/v2';

export const pokeapi = createApi({
  reducerPath: 'pokeapi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getPokemons: build.query<{ results: ResultData[] }, void>({
      query: () => '/pokemon/?limit=1000&offset=0',
    }),
    getPokemon: build.query({
      query: (id) => `/pokemon/${id}`,
    }),
    getAbility: build.query({
      query: (id) => `/ability/${id}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonQuery, useGetAbilityQuery } =
  pokeapi;
