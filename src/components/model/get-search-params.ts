import { useSearchParams } from 'react-router-dom';

export function useGetSearchParams() {
  const [searchParams] = useSearchParams();

  const [localSearchTerm, localItemQty] = localStorage
    .getItem('queryDataRSG')
    ?.split('&') || ['', ''];

  const searchTerm = searchParams.get('search') || localSearchTerm;

  const itemQty = searchParams.get('itemqty') || localItemQty;

  return [searchTerm, itemQty];
}
