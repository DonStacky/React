import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  MemoryRouter,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { SearchField } from './search-field';
import { renderWithProviders } from '../../../shared/test-utils';
import AppRouter from '../../../router/AppRouter';

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(() => null),
  },
  writable: true,
});

describe('Tests for the Search component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    renderWithProviders(
      <Router>
        <SearchField />
      </Router>
    );

    const textbox = screen.getByRole('textbox');
    await userEvent.type(textbox, 'test');
    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'searchTermRSG',
      'test'
    );
    expect(window.localStorage.setItem).toHaveBeenCalledWith('itemQtyRSG', '8');
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    const initRoute = '/page/1';

    renderWithProviders(
      <MemoryRouter initialEntries={[initRoute]}>
        <Routes>{AppRouter}</Routes>
      </MemoryRouter>
    );

    const textbox = await screen.findByRole('textbox');
    await userEvent.type(textbox, 'test');
    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(window.localStorage.getItem).toHaveBeenCalledTimes(6);
    expect(window.localStorage.getItem).toHaveBeenCalledWith(
      'MSW_COOKIE_STORE_test'
    );

    expect(textbox).toBeInTheDocument();
    expect(textbox).toHaveValue('test');
  });
});
