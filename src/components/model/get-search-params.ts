import { useSearchParams } from 'react-router-dom';

type SearchParams = {
  searchTerm: string;
  itemQty: number;
};

export function useGetSearchParams(): SearchParams {
  const [searchParams] = useSearchParams();

  const [localSearchTerm, localItemQty] = localStorage
    .getItem('queryDataRSG')
    ?.split('&') || ['', ''];

  const searchTerm = searchParams.get('search') ?? localSearchTerm;

  const itemQty = searchParams.get('itemqty') ?? localItemQty;

  return { searchTerm, itemQty: Number(itemQty) };
}
