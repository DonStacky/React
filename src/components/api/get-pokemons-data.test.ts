import { getPokemonsData } from './get-page-data';
import { jsonPokemon } from '../../shared/test-data';
import { fetchArgs } from '../../shared/test-data';
import { jsonAbility } from '../../shared/test-data';

global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

const getPokemonArg = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1' },
];

const result = {
  description:
    "This Pokémon's Speed is doubled during strong sunlight.\n\nThis bonus does not count as a stat modifier.",
  id: 2,
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
  name: 'Bulbasaur',
};

describe('Get pokemon data', () => {
  test('Function correctly return result', async () => {
    mockFetch.mockImplementation((arg) => {
      if (arg === fetchArgs.pokemon) {
        return Promise.resolve({
          json: () => Promise.resolve(jsonPokemon),
        } as Response);
      } else {
        return Promise.resolve({
          json: () => Promise.resolve(jsonAbility),
        } as Response);
      }
    });

    const pokemonsData = await getPokemonsData(getPokemonArg, 0);
    expect(mockFetch).toHaveBeenCalledTimes(2);
    expect(pokemonsData).toEqual(result);
  });
});
