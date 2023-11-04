import { Outlet } from 'react-router-dom';
import { SearchField } from '../../components/ui/search-field/search-field';
import './app.scss';

export const App = () => {
  return (
    <>
      <header className="header">
        <SearchField />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};
