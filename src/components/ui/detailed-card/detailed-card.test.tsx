import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes } from 'react-router-dom';
import AppRouter from '../../../router/AppRouter';
import { detailedPageData, pageData } from '../../../shared/test-data';
import { getPageData } from '../../api/get-page-data';
import { getPokemonDetails } from '../../api/get-pokemon-details';
import { DetailedCard } from './detailed-card';

jest.mock('../../api/get-pokemon-details');
(getPokemonDetails as jest.Mock).mockImplementation(() =>
  Promise.resolve(detailedPageData)
);

jest.mock('../../api/get-page-data');
(getPageData as jest.Mock).mockImplementation(() => Promise.resolve(pageData));

describe('Tests for the Detailed Card component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    render(
      <BrowserRouter>
        <DetailedCard />
      </BrowserRouter>
    );

    const card = screen.getByTestId('detailed-card');
    expect(card).toBeInTheDocument();
    const loader = screen.getByAltText('pokeball-loader');
    expect(loader).toBeInTheDocument();

    await waitFor(() => {
      expect(loader).not.toBeInTheDocument();
    });
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <BrowserRouter>
        <DetailedCard />
      </BrowserRouter>
    );

    const name = await screen.findByRole('heading', { name: 'Bulbasaur' });
    const height = await screen.findByRole('heading', { name: 'Height' });
    const weight = await screen.findByRole('heading', { name: 'Weight' });
    const img = await screen.findByRole('img', { name: 'bulbasaur' });

    expect(name).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
    expect(img).toBeInTheDocument();

    const imgSrc = img.getAttribute('src');
    const heightInfo = screen.getByText('0.7 m');
    const weightInfo = screen.getByText('6.9 kg');
    const typesInfo = screen.getByText('grass, poison');

    expect(imgSrc).toEqual(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
    );
    expect(heightInfo).toBeInTheDocument();
    expect(weightInfo).toBeInTheDocument();
    expect(typesInfo).toBeInTheDocument();
  });

  it('Ensure that clicking the close button hides the component', async () => {
    render(
      <BrowserRouter>
        <Routes>{AppRouter}</Routes>
      </BrowserRouter>
    );

    const linkToDetails = await screen.findByRole('link');
    expect(linkToDetails).toBeInTheDocument();

    await userEvent.click(linkToDetails);
    const detailedCard = screen.getByRole('heading', {
      name: 'Stage of evolution',
    });
    expect(detailedCard).toBeInTheDocument();

    const closeButton = await screen.findByRole('button', { name: 'x' });
    await userEvent.click(closeButton);
    expect(detailedCard).not.toBeInTheDocument();
  });
});
