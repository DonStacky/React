import { useRouteError } from 'react-router-dom';
import { NotFound } from '../../components/ui/not-found/not-found';

export const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return <NotFound />;
};
