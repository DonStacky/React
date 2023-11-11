import { getPageData } from './get-page-data';
import {
  jsonPokemon,
  jsonAbility,
  expectedPageData,
} from '../../shared/test-data';

global.fetch = jest.fn();
const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

export const fetchArgs = {
  base: 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0',
  details: 'https://pokeapi.co/api/v2/pokemon/1/',
  ability: 'https://pokeapi.co/api/v2/ability/34/',
};

const baseResult = {
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
  ],
};

mockFetch.mockImplementation((arg) => {
  if (arg === fetchArgs.base) {
    return Promise.resolve({
      json: () => Promise.resolve(baseResult),
    } as Response);
  } else if (arg === fetchArgs.details) {
    return Promise.resolve({
      json: () => Promise.resolve(jsonPokemon),
    } as Response);
  } else {
    return Promise.resolve({
      json: () => Promise.resolve(jsonAbility),
    } as Response);
  }
});

describe('Get page data', () => {
  it('Function correctly return result empty search', async () => {
    const receivedPageData = await getPageData('', 1, 1);

    expect(receivedPageData).toEqual(expectedPageData);
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it('Function correctly return result not empty search', async () => {
    const receivedPageData = await getPageData('bulbasaur', 1, 1);

    expect(receivedPageData).toEqual(expectedPageData);
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });
});
