import { getURL } from './get-url';

describe('Get url', () => {
  test('Get init url', () => {
    expect(getURL(1, '', 8)).toBe(`/page/1?search=&itemqty=8`);
  });
  test('Get standart url', () => {
    expect(getURL(5, 'a', 10)).toBe(`/page/5?search=a&itemqty=10`);
  });
  test('Get url with params less than zero', () => {
    expect(getURL(-1, '', -1)).toBe(`/page/-1?search=&itemqty=8`);
  });
  test('Get url with large params', () => {
    expect(getURL(100, 'abcdef', 100)).toBe(
      `/page/100?search=abcdef&itemqty=8`
    );
  });
  test('Get url below bound value', () => {
    expect(getURL(0, '', 2)).toBe(`/page/0?search=&itemqty=2`);
  });
  test('Get url upper bound value', () => {
    expect(getURL(0, '', 8)).toBe(`/page/0?search=&itemqty=8`);
  });
});
