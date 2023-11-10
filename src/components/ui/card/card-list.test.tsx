import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchContext } from '../../../pages/app/App';
import { getPageData } from '../../api/get-page-data';
import { PageDataContext, ResultField } from '../result-field/result-field';
import { Cards } from './card';
import { searchContextValue } from '../../../shared/test-data';

const pageDataWithCard = {
  pageItems: [
    {
      id: 1,
      name: 'Bulbasaur',
      description:
        "This Pokémon's Speed is doubled during strong sunl…t.\n\nThis bonus does not count as a stat modifier.",
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    },
    {
      id: 2,
      name: 'Bulbasaur',
      description:
        "This Pokémon's Speed is doubled during strong sunl…t.\n\nThis bonus does not count as a stat modifier.",
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    },
    {
      id: 3,
      name: 'Bulbasaur',
      description:
        "This Pokémon's Speed is doubled during strong sunl…t.\n\nThis bonus does not count as a stat modifier.",
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    },
  ],
  currentPage: 1,
  lastPage: 1,
  itemQty: 3,
};

const pageDataNoCard = {
  pageItems: [],
  currentPage: 1,
  lastPage: 1,
  itemQty: 0,
};

jest.mock('../../api/get-page-data');
(getPageData as jest.Mock).mockImplementation(() =>
  Promise.resolve(pageDataNoCard)
);

describe('Tests for the Card List component', () => {
  it('Verify that the component renders the specified number of cards', () => {
    render(
      <Router>
        <PageDataContext.Provider value={pageDataWithCard}>
          <Cards />
        </PageDataContext.Provider>
      </Router>
    );

    const cardList = screen.getByTestId('card-list');
    const cards = screen.getAllByTestId('card');

    expect(cardList).toBeInTheDocument();
    expect(cards).toHaveLength(3);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    render(
      <Router>
        <SearchContext.Provider value={searchContextValue}>
          <ResultField />
        </SearchContext.Provider>
      </Router>
    );

    const cardList = screen.queryByTestId('card-list');
    const cards = screen.queryByTestId('card');
    const errorMessage = await screen.findByText(
      'Nothing was found for your request...'
    );

    expect(cardList).toBeNull();
    expect(cards).toBeNull();
    expect(errorMessage).toBeInTheDocument();
  });
});
