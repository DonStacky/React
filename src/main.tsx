import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import { DetailsField } from './components/ui/details-field/details-field';
import { ResultField } from './components/ui/result-field/result-field';
import { App } from './pages/app/App';
import { ErrorPage } from './pages/error-page/error-page';
import { detailsLoader } from './components/ui/details-field/details-field';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<ResultField />} />
      <Route path="page/:pageNumber" element={<ResultField />}>
        <Route
          path="details/:detailsID"
          element={<DetailsField />}
          loader={detailsLoader}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
