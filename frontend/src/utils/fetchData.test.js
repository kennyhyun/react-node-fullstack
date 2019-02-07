import { WINDOW_SIZE, fetchData } from './fetchData';

describe('fetchData', () => {
  it('should call method for zero totalCount', async () => {
    const method = jest.fn();
    await fetchData(method, {
      currentPage: 1,
      itemsPerPage: 8,
      currentItemCount: 0,
      totalCount: 0,
    });
    expect(method).toHaveBeenCalledWith({ limit: expect.any(Number) });
  });
  it('should call method multiple times for far window', async () => {
    const method = jest.fn();
    await fetchData(method, {
      currentPage: 9,
      itemsPerPage: 25,
      currentItemCount: 100,
      totalCount: 400,
    });
    expect(method).toHaveBeenCalledTimes(2);
    expect(method).toHaveBeenLastCalledWith({ limit: expect.any(Number), skip: 2 * WINDOW_SIZE });
  });

});
