import { pepeData } from '../../assets/data/pepe-data';
import { DetailsData } from '../../shared/types';
import { BASE_URL } from './constants';

export async function getPokemonDetails(id: number) {
  if (id === 0) return pepeData;

  const response = await fetch(BASE_URL + `/${id}`);
  const json = await response.json();
  const results = json;
  const abilitiesResp = results.abilities;

  const name: string = results.name[0].toUpperCase() + results.name.slice(1);
  const image: string = json.sprites.other['official-artwork'].front_default;
  const height: string = `${json.height / 10} m`;
  const weight: string = `${json.weight / 10} kg`;
  const types: string[] = json.types
    .map((item: { type: { name: string } }) => item.type.name)
    .join(', ');
  const abilities: string[][] = [];

  for (let i = 0; i < abilitiesResp.length; i++) {
    const item = abilitiesResp[i];
    const response = await fetch(item.ability.url);
    const json = await response.json();
    const abilityName: string = json.name;
    const abilityText: string =
      json.effect_entries.filter(
        (item: { language: { name: string } }) => item.language.name === 'en'
      )[0]?.effect || '';

    abilities.push([abilityName, abilityText]);
  }

  const pokemonSpeciesUrl = json.species.url;
  const pokemonSpeciesResponse = await fetch(pokemonSpeciesUrl);
  const pokemonSpecies = await pokemonSpeciesResponse.json();
  const evolutionChainResponse = await fetch(
    pokemonSpecies.evolution_chain.url
  );
  const chain = (await evolutionChainResponse.json()).chain;
  const evolutionChain = getEvolutionChain(chain);
  const evolutionData = await getEvolutionData(evolutionChain);

  const details: DetailsData = {
    name,
    image,
    abilities,
    types,
    height,
    weight,
    evolutionData,
  };

  return details;
}

type EvolutionLink = { name: string };

type EvolutionChain = {
  evolves_to: [EvolutionChain];
  species: EvolutionLink;
};

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
    const response = await fetch(BASE_URL + `/${chain[link].name}`);
    const json = await response.json();
    const image: string = json.sprites.other['official-artwork'].front_default;

    evolutionData.push({ name: chain[link].name, image });
  }

  return evolutionData;
}
