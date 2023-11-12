import { DetailedCard } from '../components/ui/detailed-card/detailed-card';
import { ResultField } from '../components/ui/result-field/result-field';
import { App } from '../pages/app/App';
import { ErrorPage } from '../pages/error-page/error-page';
import { Route } from 'react-router-dom';

export default (
  <Route path="/" element={<App />}>
    <Route index element={<ResultField />} />
    <Route path="page/:pageNumber" element={<ResultField />}>
      <Route path="details/:detailsID" element={<DetailedCard />} />
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Route>
);
