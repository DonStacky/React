import { getPokemonsData } from './get-page-data';

global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

const getPokemonArg = [
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
];

const result = {
  description:
    "This Pokémon's Speed is doubled during strong sunlight.\n\nThis bonus does not count as a stat modifier.",
  id: 2,
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
  name: 'Ivysaur',
};

const fetchArgs = {
  pokemon: 'https://pokeapi.co/api/v2/pokemon/2/',
  ability: 'https://pokeapi.co/api/v2/ability/34/',
};

const jsonPokemon = {
  abilities: [
    {
      ability: {
        name: 'overgrow',
        url: 'https://pokeapi.co/api/v2/ability/65/',
      },
    },
    {
      ability: {
        name: 'chlorophyll',
        url: 'https://pokeapi.co/api/v2/ability/34/',
      },
    },
  ],
  sprites: {
    other: {
      'official-artwork': {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
      },
    },
  },
  id: 2,
};

const jsonAbility = {
  name: 'chlorophyll',
  effect_entries: [
    {
      effect:
        "This Pokémon's Speed is doubled during strong sunlight.\n\nThis bonus does not count as a stat modifier.",
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
};

describe('get pokemon data', () => {
  test('get init data', async () => {
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
