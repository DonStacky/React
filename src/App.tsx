import { Outlet } from 'react-router-dom';
import './App.scss';
import { Header } from './components/ui/header';
import { Main } from './pages/main';

function App() {
  return (
    <>
      <Header></Header>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default App;
