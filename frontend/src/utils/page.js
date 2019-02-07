export function getNewPage({ page: currentPage = 1, itemsPerPage: currentItems = 8 }, items) {
  // return new page including the first item on the current page
  if (!items || currentPage < 1 || !currentItems) {
    return null;
  }
  const index = (currentPage - 1) * currentItems;
  return Math.ceil(index / items) || 1;
}
