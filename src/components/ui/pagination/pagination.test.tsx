import 'whatwg-fetch';
import { screen } from '@testing-library/react';
import { Pagination } from './pagination';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../../shared/test-utils';

describe('Tests for the Pagination component', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    const history = createMemoryHistory();
    renderWithProviders(
      <Router location={history.location} navigator={history}>
        <Pagination />
      </Router>
    );

    const firstPage = screen.getByRole('button', { name: '<<' });
    const prevPage = screen.getByRole('button', { name: '<' });
    const nextPage = screen.getByRole('button', { name: '>' });
    const lastPage = screen.getByRole('button', { name: '>>' });

    expect(history.location.pathname).toBe('/');

    await userEvent.click(firstPage);

    expect(history.location.pathname).toBe(`/page/1`);

    await userEvent.click(nextPage);

    expect(history.location.pathname).toBe(`/page/2`);

    await userEvent.click(lastPage);

    expect(history.location.pathname).toBe(`/page/125`);

    await userEvent.click(prevPage);

    expect(history.location.pathname).toBe(`/page/0`);
  });
});
