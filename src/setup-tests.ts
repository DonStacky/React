import { server } from './mock/api/server';
import { pokeapi } from './components/api/pokeapi';
import { setupStore } from './store/store';

const store = setupStore();

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
  store.dispatch(pokeapi.util.resetApiState());
});

afterAll(() => {
  server.close();
});
