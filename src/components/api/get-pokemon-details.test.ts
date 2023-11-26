import { getPokemonDetails } from './get-pokemon-details';
import {
  jsonPokemon,
  fetchArgs,
  jsonAbility1,
  evolutionChainResponse,
  detailedPageData,
  jsonAbility2,
} from '../../shared/test-data';

global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('Get pokemon details', () => {
  it('Function correctly return result', async () => {
    mockFetch.mockImplementation((arg) => {
      if (arg === fetchArgs.pokemon) {
        return Promise.resolve({
          json: () => Promise.resolve(jsonPokemon),
        } as Response);
      } else if (arg === fetchArgs.ability1) {
        return Promise.resolve({
          json: () => Promise.resolve(jsonAbility1),
        } as Response);
      } else if (arg === fetchArgs.ability2) {
        return Promise.resolve({
          json: () => Promise.resolve(jsonAbility2),
        } as Response);
      } else {
        return Promise.resolve({
          json: () => Promise.resolve(evolutionChainResponse),
        } as Response);
      }
    });

    const pokemonDetails = await getPokemonDetails(1);
    expect(mockFetch).toHaveBeenCalledTimes(5);
    expect(pokemonDetails).toEqual(detailedPageData);
  });
});
