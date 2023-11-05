export function getURL(page: number, search: string, itemqty: number) {
  return `/page/${page}?search=${search}&itemqty=${itemqty}`;
}
