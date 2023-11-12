export function getURL(page: number, search: string, itemqty: number) {
  if (itemqty < 2 || itemqty > 20) itemqty = 8;

  return `/page/${page}?search=${search}&itemqty=${itemqty}`;
}
