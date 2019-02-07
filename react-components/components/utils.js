export const getVisiblePageIndice = (pages, page, visibleLength) => {
  const len = Math.min(visibleLength, pages);
  const leftEdge = (page - (len / 2 | 0)) + 1;
  if ((leftEdge + len) > pages) {
    const first = pages - len + 1;
    return [...Array(len).keys()].map(i => i + first);
  }
  const first = Math.max(leftEdge, 1);
  return [...Array(len).keys()].map(i => i + first);
};
