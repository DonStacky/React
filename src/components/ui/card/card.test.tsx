import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, MemoryRouter, Routes } from 'react-router-dom';
import AppRouter from '../../../router/AppRouter';
import {
  evolutionChainResponse,
  fetchArgs,
  jsonAbility,
  jsonPokemon,
  pageData,
} from '../../../shared/test-data';
import { getPageData } from '../../api/get-page-data';
import { Card } from './card';

jest.mock('../../api/get-page-data');
(getPageData as jest.Mock).mockImplementation(() => Promise.resolve(pageData));

global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

mockFetch.mockImplementation((arg) => {
  if (arg === fetchArgs.pokemon) {
    return Promise.resolve({
      json: () => Promise.resolve(jsonPokemon),
    } as Response);
  } else if (arg === fetchArgs.ability1) {
    return Promise.resolve({
      json: () => Promise.resolve(jsonAbility),
    } as Response);
  } else if (arg === fetchArgs.ability2) {
    return Promise.resolve({
      json: () => Promise.resolve(jsonAbility),
    } as Response);
  } else {
    return Promise.resolve({
      json: () => Promise.resolve(evolutionChainResponse),
    } as Response);
  }
});

describe('Tests for the Card component', () => {
  test('Ensure that the card component renders the relevant card data', () => {
    render(
      <BrowserRouter>
        <Card
          id={1}
          name="name"
          description="description"
          image="image"
          page={1}
        />
      </BrowserRouter>
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
      <BrowserRouter>
        <Routes>{AppRouter}</Routes>
      </BrowserRouter>
    );

    const linkToDetails = await screen.findByRole('link');
    expect(linkToDetails).toBeInTheDocument();

    await userEvent.click(linkToDetails);
    const detailedCard = await screen.findByTestId('detailed-card');
    expect(detailedCard).toBeInTheDocument();
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>{AppRouter}</Routes>
      </MemoryRouter>
    );

    const linkToDetails = await screen.findByRole('link');
    expect(linkToDetails).toBeInTheDocument();
    expect(mockFetch).toHaveBeenCalledTimes(0);

    await userEvent.click(linkToDetails);
    const detailedCard = screen.getByRole('heading', {
      name: 'Stage of evolution',
    });
    expect(detailedCard).toBeInTheDocument();

    expect(mockFetch).toHaveBeenCalledTimes(5);
  });
});
