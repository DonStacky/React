import { Component } from 'react';
import { SearchField } from './components/ui/search-field/search-field';
import { ResultField } from './components/ui/result-field/result-field';
import { getPokemons } from './components/model/api/get-pokemons';
import { PokemonData } from './shared/types';
import './app.scss';

type State = {
  pokemons: PokemonData[];
  isLoading: boolean;
};

class App extends Component<unknown, State> {
  state: State = {
    pokemons: [],
    isLoading: false,
  };

  componentDidMount = () => {
    const localTerm = localStorage.getItem('searchTermRSG');

    getPokemons(localTerm ?? '').then((result) => {
      this.setState({ pokemons: result, isLoading: true });
    });
  };

  searchPokemons = (searchTerm: string) => {
    this.setState({
      ...this.state,
      isLoading: false,
    });

    getPokemons(searchTerm).then((result) => {
      localStorage.setItem('searchTermRSG', searchTerm);
      this.setState({ pokemons: result, isLoading: true });
    });
  };

  render() {
    return (
      <>
        <header className="header">
          <SearchField search={this.searchPokemons} />
        </header>
        <main>
          <ResultField
            pokemons={this.state.pokemons}
            loader={this.state.isLoading}
          />
        </main>
        <footer></footer>
      </>
    );
  }
}

export default App;

export const test = true;
