import { render, screen } from '@testing-library/react';
import { Pagination } from './pagination';
import { PageDataContext } from '../result-field/result-field';
import { Router } from 'react-router-dom';
import { SearchContext } from '../../../pages/app/App';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { searchContextValue } from '../../../shared/test-data';

const pageData = {
  currentPage: 1,
  itemQty: 1,
  lastPage: 125,
  pageItems: [],
};

describe('Tests for the Pagination component', () => {
  it('Make sure the component updates URL query parameter when page changes', async () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <SearchContext.Provider value={searchContextValue}>
          <PageDataContext.Provider value={pageData}>
            <Pagination />
          </PageDataContext.Provider>
        </SearchContext.Provider>
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
