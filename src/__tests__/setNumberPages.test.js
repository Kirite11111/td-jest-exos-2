import { setNumberPages } from '../setNumberPages';

describe('setNumberPages', () => {
  it('should return 1 when max is greater than or equal to total', () => {
    expect(setNumberPages({ total: 10, max: 10 })).toEqual(1);
    expect(setNumberPages({ total: 5, max: 10 })).toEqual(1);
  });

  it('should calculate number of pages correctly when max is less than total', () => {
    expect(setNumberPages({ total: 101, max: 10 })).toEqual(10);
  });

  it('should handle default parameters', () => {
    expect(setNumberPages({})).toEqual(1);
  });

});
