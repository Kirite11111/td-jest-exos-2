import { setCurrentPage } from '../setCurrentPage';

describe('setCurrentPage', () => {
  it('returns 1 when max is 0 to avoid division by zero', () => {
    expect(setCurrentPage({ max: 0, skip: 0 })).toEqual(1);
    expect(setCurrentPage({ max: 0, skip: 10 })).toEqual(1);
  });

  it('calculates the current page correctly when max is non-zero', () => {
    expect(setCurrentPage({ max: 10, skip: 20 })).toEqual(2);
    expect(setCurrentPage({ max: 10, skip: 25 })).toEqual(3); 
  });

  it('handles inputs as strings that can be converted to numbers', () => {
    expect(setCurrentPage({ max: '10', skip: '20' })).toEqual(2); 
    expect(setCurrentPage({ max: '10', skip: '25' })).toEqual(3);
  });
  
});
