type SearchParams = {
  searchTerm: string;
  itemQty: number;
};

export function useGetSearchParams(): SearchParams {
  const [localSearchTerm, localItemQty] = /* localStorage
    .getItem('queryDataRSG')
    ?.split('&') || */ ['', ''];

  const searchTerm = localSearchTerm;

  const itemQty = localItemQty;

  return { searchTerm, itemQty: Number(itemQty) };
}
