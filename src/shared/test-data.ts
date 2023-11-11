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

export const detailedPageData = {
  abilities: [
    [
      'overgrow',
      'When this Pokémon has 1/3 or less of its HP remain…s-type moves inflict 1.5× as much regular damage.',
    ],
    [
      'chlorophyll',
      "This Pokémon's Speed is doubled during strong sunl…t.\n\nThis bonus does not count as a stat modifier.",
    ],
  ],
  evolutionData: [
    {
      name: 'bulbasaur',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/…ster/sprites/pokemon/other/official-artwork/1.png',
    },
    {
      name: 'ivysaur',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/…ster/sprites/pokemon/other/official-artwork/2.png',
    },
    {
      name: 'venusaur',
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/…ster/sprites/pokemon/other/official-artwork/3.png',
    },
  ],
  height: '0.7 m',
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
  name: 'Bulbasaur',
  types: 'grass, poison',
  weight: '6.9 kg',
};
