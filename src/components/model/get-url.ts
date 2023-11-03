export function getURL(page: number, search: string, itemqty: string) {
  return (
    `page/${page}` +
    (search && itemqty
      ? `?search=${search}&itemqty=${itemqty}`
      : search
      ? `?search=${search}`
      : itemqty
      ? `?itemqty=${itemqty}`
      : '')
  );
}
