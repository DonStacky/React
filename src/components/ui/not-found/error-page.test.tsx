import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { NotFound } from './not-found';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: () => {
    return {
      get: () => '',
    };
  },
}));

jest.mock('next/router', () => require('next-router-mock'));

jest.mock('./not-found.module.scss', () => ({
  styles: {
    'not-found': [],
  },
}));

describe('Tests for the 404 Page component', () => {
  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    render(<NotFound />);

    const errorMessage = await screen.findByText('The page not found');
    expect(errorMessage).toBeInTheDocument();
  });
});
