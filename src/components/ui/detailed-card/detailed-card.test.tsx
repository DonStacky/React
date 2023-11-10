// import { render } from '@testing-library/react';
// import { DetailedCard } from './detailed-card';
import '@testing-library/jest-dom';
// import { BrowserRouter } from 'react-router-dom';

const detailedPageData = {
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

const mockLoaderData = jest.fn(() => {
  detailedPageData;
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => mockLoaderData,
}));

// describe('Tests for the Detailed Card component', () => {
//   it('Check that a loading indicator is displayed while fetching data', () => {
//     render(
//       <BrowserRouter>
//         <DetailedCard />
//       </BrowserRouter>
//     );
//   });
// });
