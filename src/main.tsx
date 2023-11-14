import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { Provider } from 'react-redux';
import store from './pages/app/store';

const router = createBrowserRouter(createRoutesFromElements(AppRouter));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
