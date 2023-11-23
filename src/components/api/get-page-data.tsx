import { PokemonData, ResultData } from '../../shared/types';
export const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

export async function getPageData(
  searchTerm = '',
  itemQty = 8,
  currentPage = 1
) {
  const response = await fetch(BASE_URL + '?limit=1000');
  const json = await response.json();
  let results: ResultData[] = json.results;

  results = results.filter(
    (pokemon: { name: string }) => !pokemon.name.includes('-')
  );

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
      pageItems.push(await getPokemonsData(results, pokemonNumber));
    } catch (e) {
      console.log(e);
    }
  }

  return { pageItems, lastPage: pagesQty, currentPage, itemQty };
}

export async function getPokemonsData(
  results: ResultData[],
  pokemonNumber: number
) {
  const name =
    results[pokemonNumber].name[0].toUpperCase() +
    results[pokemonNumber].name.slice(1);
  const details = results[pokemonNumber].url;
  const response = await fetch(details);
  const json = await response.json();

  const abilityURL: string =
    json?.abilities[1]?.ability.url || json?.abilities[0].ability.url;
  const abilityResp = await fetch(abilityURL);
  const abilityJson = await abilityResp.json();

  const abilityDesc: string =
    abilityJson.effect_entries.filter(
      (item: { language: { name: string } }) => item.language.name === 'en'
    )[0]?.effect || `He uses ${abilityJson.name}`;

  const imageURL: string = json.sprites.other['official-artwork'].front_default;

  const id: number = json.id;

  const pageItem: PokemonData = {
    id,
    name,
    description: abilityDesc,
    image: imageURL,
  };

  return pageItem;
}
