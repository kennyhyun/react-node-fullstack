import { getNewPage } from './page';

describe('getNewPage', () => {
  it('should return null for no items', () => {
    const resp = getNewPage({});
    expect(resp).toBe(null);
  });
  it('should return null for no null current page', () => {
    const resp = getNewPage({ page: null });
    expect(resp).toBe(null);
  });
  it('should return null for no null current itemsPerPage', () => {
    const resp = getNewPage({ itemsPerPage: null });
    expect(resp).toBe(null);
  });
  it('should return page 1 for no current info', () => {
    const resp = getNewPage({}, 32);
    expect(resp).toBe(1);
  });
  it('should return bigger page for descreasing items', () => {
    const resp = getNewPage({ page: 3, itemsPerPage: 32 }, 8);
    expect(resp).toBeGreaterThanOrEqual(3);
  });
  it('should return smaller page for increasing items', () => {
    const resp = getNewPage({ page: 3, itemsPerPage: 4 }, 32);
    expect(resp).toBeGreaterThan(0);
    expect(resp).toBeLessThanOrEqual(3);
  });

});
