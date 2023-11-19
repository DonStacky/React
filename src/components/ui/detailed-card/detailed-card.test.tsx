import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { DetailedCard } from './detailed-card';
import { renderWithProviders } from '../../../shared/test-utils';
import AppRouter from '../../../router/AppRouter';

describe('Tests for the Detailed Card component', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    renderWithProviders(
      <BrowserRouter>
        <DetailedCard />
      </BrowserRouter>
    );

    const card = screen.getByTestId('detailed-card');
    expect(card).toBeInTheDocument();
    const loader = screen.getByAltText('pokeball-loader');
    expect(loader).toBeInTheDocument();
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderWithProviders(
      <BrowserRouter>
        <DetailedCard />
      </BrowserRouter>
    );
  });

  it('Ensure that clicking the close button hides the component', async () => {
    renderWithProviders(
      <BrowserRouter>
        <Routes>{AppRouter}</Routes>
      </BrowserRouter>
    );
  });
});
