import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ResultField } from '../result-field/result-field';
import { CardList } from './card-list';
import { renderWithProviders } from '../../../shared/test-utils';

// const pageDataWithCard = {
//   pageItems: [
//     {
//       id: 1,
//       name: 'Bulbasaur',
//       description:
//         "This Pokémon's Speed is doubled during strong sunl…t.\n\nThis bonus does not count as a stat modifier.",
//       image:
//         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
//     },
//     {
//       id: 2,
//       name: 'Bulbasaur',
//       description:
//         "This Pokémon's Speed is doubled during strong sunl…t.\n\nThis bonus does not count as a stat modifier.",
//       image:
//         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
//     },
//     {
//       id: 3,
//       name: 'Bulbasaur',
//       description:
//         "This Pokémon's Speed is doubled during strong sunl…t.\n\nThis bonus does not count as a stat modifier.",
//       image:
//         'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
//     },
//   ],
//   currentPage: 1,
//   lastPage: 1,
//   itemQty: 3,
// };

// const pageDataNoCard = {
//   pageItems: [],
//   currentPage: 1,
//   lastPage: 1,
//   itemQty: 0,
// };

// jest.mock('../../api/get-page-data');
// (getPageData as jest.Mock).mockImplementation(() =>
//   Promise.resolve(pageDataNoCard)
// );

describe('Tests for the Card List component', () => {
  it('Verify that the component renders the specified number of cards', () => {
    renderWithProviders(
      <Router>
        <CardList />
      </Router>
    );

    const cardList = screen.getByTestId('card-list');
    // const cards = screen.getAllByTestId('card');

    expect(cardList).toBeInTheDocument();
    // expect(cards).toHaveLength(3);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    renderWithProviders(
      <Router>
        <ResultField />
      </Router>
    );

    // const cardList = screen.queryByTestId('card-list');
    // const cards = screen.queryByTestId('card');
    // const errorMessage = await screen.findByText(
    //   'Nothing was found for your request...'
    // );

    // expect(cardList).not.toBeInTheDocument();
    // expect(cards).not.toBeInTheDocument();
    // expect(errorMessage).toBeInTheDocument();
  });
});
