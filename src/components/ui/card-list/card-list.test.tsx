import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ResultField } from '../result-field';
import { CardList } from './';

const pageDataWithCard = [
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
];

const pageDataNoCard = {
  pageItems: [],
  currentPage: 1,
  lastPage: 1,
  itemQty: 0,
};

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('next/navigation');
const pushMock = jest.fn();
const backMock = jest.fn();

(useRouter as jest.Mock).mockReturnValue({
  push: pushMock,
  back: backMock,
});

(useSearchParams as jest.Mock).mockReturnValue({
  get: () => 'test',
});

describe('Tests for the Card List component', () => {
  it('Verify that the component renders the specified number of cards', () => {
    render(<CardList pageItems={pageDataWithCard} currentPage={1} />);

    const cardList = screen.getByTestId('card-list');
    const cards = screen.getAllByTestId('card');

    expect(cardList).toBeInTheDocument();
    expect(cards).toHaveLength(3);
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    render(<ResultField pageData={pageDataNoCard} />);

    const cardList = screen.queryByTestId('card-list');
    const cards = screen.queryByTestId('card');
    const errorMessage = await screen.findByText(
      'Nothing was found for your request...'
    );

    expect(cardList).not.toBeInTheDocument();
    expect(cards).not.toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
  });
});
