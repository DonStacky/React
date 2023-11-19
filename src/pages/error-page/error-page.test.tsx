import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { MemoryRouter, Routes } from 'react-router-dom';
import AppRouter from '../../router/AppRouter';
import { renderWithProviders } from '../../shared/test-utils';

describe('Tests for the 404 Page component', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    const badRoute = '/bad/route';

    renderWithProviders(
      <MemoryRouter initialEntries={[badRoute]}>
        <Routes>{AppRouter}</Routes>
      </MemoryRouter>
    );

    const errorMessage = await screen.findByText('The page not found');
    expect(errorMessage).toBeInTheDocument();
  });
});
