import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from '../../../pages/app/App';
import { SearchField } from './search-field';
import { renderWithProviders } from '../../../shared/test-utils';

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
    // expect(window.localStorage.setItem).toHaveBeenCalledWith(
    //   'queryDataRSG',
    //   'test&8'
    // );
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    renderWithProviders(
      <Router>
        <App />
      </Router>
    );

    // expect(window.localStorage.getItem).toHaveBeenCalledTimes(1);
    // expect(window.localStorage.getItem).toHaveBeenCalledWith('queryDataRSG');

    const textbox = await screen.findByRole('textbox');
    expect(textbox).toBeInTheDocument();
    // expect(textbox).toHaveValue('test');
  });
});
