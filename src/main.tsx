import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
// import { DetailedCard } from './components/ui/detailed-card/detailed-card';
// import { ResultField } from './components/ui/result-field/result-field';
// import { ErrorPage } from './pages/error-page/error-page';
// import { detailsLoader } from './components/ui/detailed-card/detailed-card';

import App from './App';
import { MainPage } from './pages/main-page';
import { ReactHookForm } from './pages/react-hook-form';
import { UncontrolledForm } from './pages/uncontrolled-form';

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
    <RouterProvider router={router} />
  </StrictMode>
);
