export const searchContextValue = {
  searchParams: { searchTerm: '', itemQty: 8 },
  setSearchParams: () => {},
};

export const pageData = {
  currentPage: 1,
  itemQty: 1,
  lastPage: 125,
  pageItems: [
    {
      id: 1,
      name: 'Bulbasaur',
      description:
        "This Pokémon's Speed is doubled during strong sunl…t. This bonus does not count as a stat modifier.",
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    },
  ],
};

export const expectedPageData = {
  currentPage: 1,
  itemQty: 1,
  lastPage: 1,
  pageItems: [
    {
      id: 2,
      name: 'Bulbasaur',
      description:
        "This Pokémon's Speed is doubled during strong sunlight.\n\nThis bonus does not count as a stat modifier.",
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    },
  ],
};

export const detailedPageData = {
  abilities: [
    [
      'overgrow',
      'When this Pokémon has 1/3 or less of its HP remain…s-type moves inflict 1.5× as much regular damage.',
    ],
    [
      'chlorophyll',
      "This Pokémon's Speed is doubled during strong sunlight.\n\nThis bonus does not count as a stat modifier.",
    ],
  ],
  evolutionData: [],
  height: '0.7 m',
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  name: 'Bulbasaur',
  types: 'grass, poison',
  weight: '6.9 kg',
};

export const fetchArgs = {
  pokemon: 'https://pokeapi.co/api/v2/pokemon/1',
  ability1: 'https://pokeapi.co/api/v2/ability/65/',
  ability2: 'https://pokeapi.co/api/v2/ability/34/',
  species: 'https://pokeapi.co/api/v2/pokemon-species/2/',
};

export const jsonPokemon = {
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
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    },
  },
  id: 2,
  name: 'Bulbasaur',
  types: [
    {
      type: { name: 'grass' },
    },
    { type: { name: 'poison' } },
  ],
  species: {
    url: 'https://pokeapi.co/api/v2/pokemon-species/2/',
  },
  weight: 69,
  height: 7,
  evolutionData: [
    {
      name: 'bulbasaur',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    },
    {
      name: 'ivysaur',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png',
    },
    {
      name: 'venusaur',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png',
    },
  ],
};

export const jsonAbility2 = {
  name: 'chlorophyll',
  effect_entries: [
    {
      effect:
        "This Pokémon's Speed is doubled during strong sunlight.\n\nThis bonus does not count as a stat modifier.",
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
};
export const jsonAbility1 = {
  name: 'overgrow',
  effect_entries: [
    {
      effect:
        'When this Pokémon has 1/3 or less of its HP remain…s-type moves inflict 1.5× as much regular damage.',
      language: { name: 'en', url: 'https://pokeapi.co/api/v2/language/9/' },
    },
  ],
};

export const evolutionChainResponse = {
  evolution_chain: {
    url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
  },
};
