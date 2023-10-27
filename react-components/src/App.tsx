import { Component } from 'react';
import { SearchField } from './components/ui/search-field/search-field';
import { ResultField } from './components/ui/result-field/result-field';
import { getPokemons } from './components/model/get-pokemons';
import { PokemonData } from './shared/types';
import './app.scss';

type State = {
  pokemons: boolean | PokemonData[];
};

class App extends Component<unknown, State> {
  state: State = {
    pokemons: true,
  };

  componentDidMount = () => {
    const localTerm = localStorage.getItem('searchTermRSG');

    getPokemons(localTerm ?? '').then((result) => {
      this.selectState(result);
    });
  };

  searchPokemons = (searchTerm: string) => {
    this.setState({
      pokemons: true,
    });

    getPokemons(searchTerm).then((result) => {
      localStorage.setItem('searchTermRSG', searchTerm);
      this.selectState(result);
    });
  };

  selectState(result: PokemonData[]) {
    if (result.length === 0) {
      this.setState({ pokemons: false });
    } else {
      this.setState({ pokemons: result });
    }
  }

  render() {
    return (
      <>
        <header className="header">
          <SearchField search={this.searchPokemons}></SearchField>
        </header>
        <main>
          <ResultField pokemons={this.state.pokemons}></ResultField>
        </main>
        <footer></footer>
      </>
    );
  }
}

export default App;
