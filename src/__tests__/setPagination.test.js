import { setPagination } from '../setPagination';
import * as setCurrentPageModule from '../setCurrentPage';
import * as setNumberPagesModule from '../setNumberPages';

jest.mock('../setCurrentPage', () => ({
  ...jest.requireActual('../setCurrentPage'),
  setCurrentPage: jest.fn(),
}));

jest.mock('../setNumberPages', () => ({
  ...jest.requireActual('../setNumberPages'),
  setNumberPages: jest.fn(),
}));

describe('setPagination', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calculates pagination correctly', () => {
    setCurrentPageModule.setCurrentPage.mockImplementation(({ max, skip }) => Math.ceil(skip / max));
    setNumberPagesModule.setNumberPages.mockImplementation(({ total, max }) => Math.ceil(total / max));

    const total = 100;
    const skip = 10;
    const max = 10;

    const result = setPagination({ total, skip, max });

    expect(setCurrentPageModule.setCurrentPage).toHaveBeenCalledWith({ max, skip });
    expect(setNumberPagesModule.setNumberPages).toHaveBeenCalledWith({ total, max });

    const expected = {
      total: 100,
      numberItems: 10,
      numberPages: 10,
      currentPage: 1,
    };
    expect(result).toEqual(expected);
  });
});
