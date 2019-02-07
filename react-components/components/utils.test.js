import { getVisiblePageIndice } from './utils';

describe('getVisiblePageIndice', () => {
  it('should return array length of pages for larger visibleLength', () => {
    const arr = getVisiblePageIndice(4, 2, 10);
    expect(arr.length).toBe(4);
    expect(arr).toEqual([1,2,3,4]);
  });
  it('should return array with the last item as the last page if no more pages', () => {
    const arr1 = getVisiblePageIndice(4, 4, 10);
    expect(arr1.length).toBe(4);
    expect(arr1).toEqual([1,2,3,4]);
    const arr2 = getVisiblePageIndice(20, 19, 10);
    expect(arr2.length).toBe(10);
    expect(arr2).toEqual([...Array(10).keys()].map(i => i + 11));
  });
  it('should return array starting from smaller index so that page comes to the middle', () => {
    const arr = getVisiblePageIndice(20, 10, 10);
    expect(arr).toEqual([...Array(10).keys()].map(i => i + 6));
  });

});
