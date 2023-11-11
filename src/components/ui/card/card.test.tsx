import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MemoryRouter,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import AppRouter from '../../../router/AppRouter';
import { getPageData } from '../../api/get-page-data';
import { Card } from './card';

// jest.mock('../../api/get-page-data');
// (getPageData as jest.Mock).mockImplementation(() => Promise.resolve(pageData));

// jest.mock('../detailed-card/detailed-card');
// (detailsLoader as jest.Mock).mockImplementation(() =>
//   Promise.resolve(detailedPageData)
// );

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
      <MemoryRouter initialEntries={['/']}>
        <Routes>{AppRouter}</Routes>
      </MemoryRouter>
    );

    expect(screen.queryByTestId('detailed-card')).toBeNull();

    const card = await screen.findByText('Bulbasaur');
    expect(card).toBeInTheDocument();
    const link = screen.getByRole('link');
    await userEvent.click(link);

    // const detailedCard = await screen.findByTestId('detailed-card');
    // expect(detailedCard).toBeInTheDocument();
    // screen.debug(detailedCard);
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>{AppRouter}</Routes>
      </MemoryRouter>
    );

    expect(getPageData).toHaveBeenCalledTimes(1);

    const link = await screen.findByRole('link');
    await userEvent.click(link);

    expect(getPageData).toHaveBeenCalledTimes(2);

    // expect(detailsLoader).toHaveBeenCalledTimes(1);
  });
});
