import { useEffect, useState } from 'react';
import { SearchField } from './components/ui/search-field/search-field';
import { ResultField } from './components/ui/result-field/result-field';
import { getPokemons } from './components/model/api/get-pokemons';
import { PokemonData } from './shared/types';
import './app.scss';

export const App = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let ignore = false;

    const localTerm = localStorage.getItem('searchTermRSG');
    getPokemons(localTerm ?? '').then((result) => {
      if (!ignore) {
        setIsLoading(true);
        setPokemons(result);
      }
    });

    return () => {
      ignore = true;
    };
  }, []);

  const searchPokemons = (searchTerm: string) => {
    setIsLoading(false);
    getPokemons(searchTerm).then((result) => {
      localStorage.setItem('searchTermRSG', searchTerm);
      setIsLoading(true);
      setPokemons(result);
    });
  };

  return (
    <>
      <header className="header">
        <SearchField search={searchPokemons} />
      </header>
      <main>
        <ResultField pokemons={pokemons} loader={isLoading} />
      </main>
      <footer></footer>
    </>
  );
};
