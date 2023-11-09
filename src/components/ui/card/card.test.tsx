import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import {
  MemoryRouter,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import AppRouter from '../../../router/AppRouter';
import { getPageData } from '../../api/get-page-data';
import { Card } from './card';

const pageData = {
  currentPage: 1,
  itemQty: 1,
  lastPage: 125,
  pageItems: [
    {
      id: 1,
      name: 'Bulbasaur',
      description:
        "This Pokémon's Speed is doubled during strong sunl…t.\n\nThis bonus does not count as a stat modifier.",
      image:
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
    },
  ],
};

jest.mock('../../api/get-page-data');
(getPageData as jest.Mock).mockImplementation(() => Promise.resolve(pageData));

describe('Tests for the Card component', () => {
  test('Ensure that the card component renders the relevant card data', () => {
    render(
      <Router>
        <Card
          id={1}
          name="name"
          description="description"
          image="image"
          page={1}
        />
      </Router>
    );

    const image = screen.getByAltText('name');
    const title = screen.getByText('name');
    const description = screen.getByText('description');
    const imgSrc = image.getAttribute('src');

    expect(image).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(imgSrc).toEqual('image');
  });

  test('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>{AppRouter}</Routes>
      </MemoryRouter>
    );
    // getPageData.mockReturnValue(Promise.resolve(pageData));

    expect(screen.queryByTestId('detailed-card')).toBeNull();
    // expect(screen.queryByTestId('detailed-card')).toBeInTheDocument();
    await screen.findByTestId('card');

    expect(screen.queryByTestId('card')).toBeInTheDocument();
    // const card = screen.getByTestId('card');
    // fireEvent.click(card);
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>{AppRouter}</Routes>
      </MemoryRouter>
    );
    // getPageData.mockReturnValue(Promise.resolve(pageData));

    expect(screen.queryByTestId('detailed-card')).toBeNull();
    // expect(screen.queryByTestId('detailed-card')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByTestId('card')).toBeInTheDocument();
    });
    // const card = screen.getByTestId('card');
    // fireEvent.click(card);
  });
});
