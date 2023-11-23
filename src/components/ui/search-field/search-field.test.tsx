import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App, SearchContext } from '../../../pages/app/App';
import { searchContextValue } from '../../../shared/test-data';
import { SearchField } from './search-field';

Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(() => null),
  },
  writable: true,
});

describe('Tests for the Search component', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    render(
      <Router>
        <SearchContext.Provider value={searchContextValue}>
          <SearchField />
        </SearchContext.Provider>
      </Router>
    );

    const textbox = screen.getByRole('textbox');
    await userEvent.type(textbox, 'test');
    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'queryDataRSG',
      'test&8'
    );
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    render(
      <Router>
        <App />
      </Router>
    );

    expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    expect(window.localStorage.getItem).toHaveBeenCalledWith('queryDataRSG');

    const textbox = await screen.findByRole('textbox');
    expect(textbox).toBeInTheDocument();
    expect(textbox).toHaveValue('test');
  });
});
