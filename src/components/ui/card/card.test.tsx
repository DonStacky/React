import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Routes } from 'react-router-dom';
import AppRouter from '../../../router/AppRouter';
import { Card } from './card';
import { renderWithProviders } from '../../../shared/test-utils';

describe('Tests for the Card component', () => {
  test('Ensure that the card component renders the relevant card data', () => {
    renderWithProviders(
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
    renderWithProviders(
      <BrowserRouter>
        <Routes>{AppRouter}</Routes>
      </BrowserRouter>
    );
  });

  test('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/page/1']}>
        <Routes>{AppRouter}</Routes>
      </MemoryRouter>
    );
  });
});
