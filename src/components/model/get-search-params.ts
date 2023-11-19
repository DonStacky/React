import { useSearchParams } from 'react-router-dom';

enum SearchParam {
  searchTerm = 'searchTerm',
  itemQty = 'itemQty',
}

export function useGetSearchParams(param: SearchParam) {
  const [searchParams] = useSearchParams();

  const [localSearchTerm, localItemQty] = localStorage
    .getItem('queryDataRSG')
    ?.split('&') || ['', ''];

  const searchTerm = searchParams.get('search') ?? localSearchTerm;
  const itemQty = searchParams.get('itemqty') ?? localItemQty;

  if (param === SearchParam.searchTerm) {
    return searchTerm;
  } else if (param === SearchParam.itemQty) {
    return Number(itemQty);
  }
}
