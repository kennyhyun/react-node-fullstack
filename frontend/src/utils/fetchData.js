export const WINDOW_SIZE = 100;

export const fetchData = async (
  method,
  {
    currentPage,
    itemsPerPage,
    currentItemCount,
    totalCount
  }
) => {
  if (!(currentPage && itemsPerPage)) {
    throw new Error('invalid arguments');
  }
  const firstVisible = (Number(currentPage) - 1) * Number(itemsPerPage) + 1;  
  const lastVisible = firstVisible + Number(itemsPerPage) - 1;
  if (!(firstVisible && lastVisible)) {
    throw new Error('invalid arguments');
  }

  const lastWindow = Math.floor(currentItemCount / WINDOW_SIZE);
  const rightWindow = Math.min(Math.ceil(lastVisible / WINDOW_SIZE), 10);

  if (currentItemCount < lastVisible) {
    // insufficient
    // call sequencially as much required
    const windowIndice = [...Array(rightWindow - lastWindow).keys()].map(i => i + lastWindow);
    return windowIndice.reduce(async (p, i) => {
      await p;
      const query = { limit: WINDOW_SIZE };
      if (i !== 0) {
        query.skip = i * WINDOW_SIZE;
      }
      console.log('calling', method.name, 'with', query);
      return method(query);
    }, Promise.resolve());
  } else {
    // TODO: call debounced
  }
};
