import { pokeapi } from './pokeapi';
import { pepeData } from '../../assets/data/pepe-data';
import {
  Pokemon,
  EvolutionLink,
  EvolutionChain,
  DetailsData,
  Ability,
} from '../../shared/types';

const INDEX_ID = 42;

type EvolutionUrl = {
  data: {
    evolution_chain: { url: string };
  };
};

export const detailedApi = pokeapi.injectEndpoints({
  endpoints: (build) => ({
    getDetailedPokemon: build.query({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
        const { id } = _arg as { id: number };
        if (id === 0) return { data: pepeData };

        const { data: json } = (await fetchWithBQ(`/pokemon/${id}`)) as Pokemon;
        const abilitiesResp = json.abilities;
        const name = json.name[0].toUpperCase() + json.name.slice(1);
        const image = json.sprites.other['official-artwork'].front_default;
        const height = `${json.height / 10} m`;
        const weight = `${json.weight / 10} kg`;
        const types = json.types
          .map((item: { type: { name: string } }) => item.type.name)
          .join(', ');
        const abilities: string[][] = [];

        for (let i = 0; i < abilitiesResp.length; i++) {
          const item = abilitiesResp[i];
          const { data: json } = (await fetchWithBQ(
            `/ability/${item.ability.name}`
          )) as Ability;
          const abilityName: string = json.name;
          const abilityText: string =
            json.effect_entries.filter(
              (item: { language: { name: string } }) =>
                item.language.name === 'en'
            )[0]?.effect || '';

          abilities.push([abilityName, abilityText]);
        }

        const { data: pokemonSpecies } = (await fetchWithBQ(
          `/pokemon-species/${json.species.name}`
        )) as EvolutionUrl;

        const evoId = pokemonSpecies.evolution_chain.url.slice(INDEX_ID);
        const { data: evoChain } = (await fetchWithBQ(
          `/evolution-chain/${evoId}`
        )) as { data: { chain: EvolutionChain } };
        const evolutionChain = getEvolutionChain(evoChain.chain);
        const evolutionData = await getEvolutionData(evolutionChain);

        function getEvolutionChain(chain: EvolutionChain): EvolutionLink[] {
          if (chain?.evolves_to) {
            const name = chain.species.name;
            return [{ name }, ...getEvolutionChain(chain.evolves_to[0])];
          } else {
            return [];
          }
        }

        async function getEvolutionData(chain: EvolutionLink[]) {
          const evolutionData = [];

          for (let link = 0; link < chain.length; link++) {
            const { data: json } = (await fetchWithBQ(
              `/pokemon/${chain[link].name}`
            )) as Pokemon;
            const image: string =
              json.sprites.other['official-artwork'].front_default;

            evolutionData.push({ name: chain[link].name, image });
          }
          return evolutionData;
        }

        const details: DetailsData = {
          name,
          image,
          abilities,
          types,
          height,
          weight,
          evolutionData,
        };

        return { data: details };
      },
    }),
  }),
});

export const { useGetDetailedPokemonQuery } = detailedApi;
