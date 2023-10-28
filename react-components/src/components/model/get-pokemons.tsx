export async function getPokemons(searchTerm?: string) {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0'
  );
  const json = await response.json();
  let results = json.results;

  if (searchTerm) {
    results = results.filter((pokemon: { name: string }) =>
      pokemon.name.includes(searchTerm.toLowerCase().trim())
    );
  }

  const pokemons = [];

  for (let pokemonNumber = 0; pokemonNumber < results.length; pokemonNumber++) {
    try {
      const name =
        results[pokemonNumber].name[0].toUpperCase() +
        results[pokemonNumber].name.slice(1);
      const details = results[pokemonNumber].url;

      const response = await fetch(details);
      const json = await response.json();

      const abilityURL =
        json?.abilities[1]?.ability.url || json?.abilities[0].ability.url;
      const abilityResp = await fetch(abilityURL);
      const abilityJson = await abilityResp.json();
      const abilityDesc =
        abilityJson.effect_entries.filter(
          (item: { language: { name: string } }) => item.language.name === 'en'
        )[0]?.effect || `He uses ${abilityJson.name}`;

      const imageURL = json.sprites.other['official-artwork'].front_default;

      const id = json.id;

      pokemons.push({
        id,
        name,
        description: abilityDesc,
        image: imageURL,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return pokemons;
}
