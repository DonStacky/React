import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResultData, PokemonData } from '../../shared/types';

const baseUrl = 'https://pokeapi.co/api/v2';

type Pokemon = {
  data: {
    abilities: { ability: { name: string } }[];
    sprites: { other: { 'official-artwork': { front_default: string } } };
    id: number;
  };
};
type Ability = {
  data: {
    effect_entries: [{ language: { name: string }; effect: string }];
    name: string;
  };
};
type PokeapiArg = { searchTerm: string; itemQty: number; currentPage: number };

export const pokeapi = createApi({
  reducerPath: 'pokeapi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getPokemons: build.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const { searchTerm, itemQty, currentPage } = _arg as PokeapiArg;
        const { data } = (await fetchWithBQ(
          '/pokemon/?limit=1000&offset=0'
        )) as { data: { results: ResultData[] } };

        let results: ResultData[] = data.results;

        if (searchTerm) {
          results = results.filter((pokemon: { name: string }) =>
            pokemon.name.includes(searchTerm.toLowerCase().trim())
          );
        }

        const pageItems: PokemonData[] = [];
        const pagesQty = Math.ceil(results.length / itemQty);
        const sequenceStart = itemQty * (currentPage - 1);
        const sequenceEnd = itemQty * currentPage;
        const sequenceLimit =
          sequenceEnd > results.length ? results.length : sequenceEnd;

        for (
          let pokemonNumber = sequenceStart;
          pokemonNumber < sequenceLimit;
          pokemonNumber++
        ) {
          try {
            const name =
              results[pokemonNumber].name[0].toUpperCase() +
              results[pokemonNumber].name.slice(1);

            const { data: json } = (await fetchWithBQ(
              `/pokemon/${results[pokemonNumber].name}`
            )) as Pokemon;

            const abilityName =
              json?.abilities[1]?.ability.name ||
              json?.abilities[0].ability.name;
            const { data: abilityJson } = (await fetchWithBQ(
              `/ability/${abilityName}/`
            )) as Ability;

            const abilityDesc =
              abilityJson.effect_entries.filter(
                (item: { language: { name: string } }) =>
                  item.language.name === 'en'
              )[0]?.effect || `He uses ${abilityJson.name}`;

            const imageURL =
              json.sprites.other['official-artwork'].front_default;

            const id = json.id;

            pageItems.push({
              id,
              name,
              description: abilityDesc,
              image: imageURL,
            });
          } catch (e) {
            console.log(e);
          }
        }
        return {
          data: { pageItems, lastPage: pagesQty, currentPage, itemQty },
        };
      },
    }),
  }),
});

export const { useGetPokemonsQuery } = pokeapi;
