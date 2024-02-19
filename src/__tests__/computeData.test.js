import { computeDataError } from '../computeDataError';
import { setResponseError, STATUS_HTTP_MESSAGES } from '../setResponseError';

// Mock des dépendances
jest.mock('../setResponseError');

describe('computeDataError', () => {
  const mockSuccessResponse = { message: 'Success message' };
  const mockErrorResponse = new Error('Failed to fetch');

  const mockResponse = (status, responseBody, shouldFail = false) => ({
    status,
    json: shouldFail ? jest.fn().mockRejectedValue(mockErrorResponse) : jest.fn().mockResolvedValue(responseBody),
  });

  beforeEach(() => {
    setResponseError.mockClear();
  });

  it('should handle successful response and return formatted error', async () => {
    const status = 200;
    const response = mockResponse(status, mockSuccessResponse);
    await computeDataError(response);

    expect(setResponseError).toHaveBeenCalledWith({
      response: {
        ...mockSuccessResponse,
        status,
      },
    });
  });

  it('should handle failed response and return error with status message', async () => {
    const status = 404;
    const response = mockResponse(status, null, true);
    await computeDataError(response);

    expect(setResponseError).toHaveBeenCalledWith({
      response: {
        anomaly: { label: STATUS_HTTP_MESSAGES[status] },
        status,
      },
    });
  });
});
