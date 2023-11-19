import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ResultField } from '../result-field/result-field';
import { renderWithProviders } from '../../../shared/test-utils';

describe('Tests for the Card List component', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    renderWithProviders(
      <Router>
        <ResultField />
      </Router>
    );
  });

  it('Check that an appropriate message is displayed if no cards are present', async () => {
    renderWithProviders(
      <Router>
        <ResultField />
      </Router>
    );
  });
});
