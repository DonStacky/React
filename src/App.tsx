import { Outlet } from 'react-router-dom';
import { Header } from './components/ui/Header';
import { Footer } from './components/ui/Footer';
import { Main } from './components/ui/Main';
import './App.scss';

function App() {
  return (
    <>
      <Header></Header>
      <Main>
        <Outlet />
      </Main>
      <Footer></Footer>
    </>
  );
}

export default App;
