import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import App from './App';
import { MainPage } from './pages/main-page';
import { ReactHookForm } from './pages/react-hook-form';
import { UncontrolledForm } from './pages/uncontrolled-form';
import { Provider } from 'react-redux';
import store from './store/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} /* errorElement={<ErrorPage />} */>
      <Route index element={<MainPage />}></Route>
      <Route path="/uncontrolled-form" element={<UncontrolledForm />} />
      <Route path="/react-hook-form" element={<ReactHookForm />}></Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store()}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
