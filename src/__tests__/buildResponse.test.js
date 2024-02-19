import { buildResponse } from '../buildResponse';
import { computeDataError } from '../computeDataError';
import { STATUS_API } from '../setResponseError';

jest.mock('../computeDataError');

describe('buildResponse', () => {
  const mockJsonResponse = { data: 'mockData' };
  const mockTextResponse = 'mockText';
  const mockBlobResponse = new Blob(['mockBlob'], { type: 'text/plain' });
  const mockStatus = 418;

  const mockResponse = (status, responseBody, isBlob = false, isText = false) => ({
    status,
    json: jest.fn().mockResolvedValue(responseBody),
    text: jest.fn().mockResolvedValue(mockTextResponse),
    blob: jest.fn().mockResolvedValue(mockBlobResponse),
  });

  beforeEach(() => {
    computeDataError.mockClear();
  });

  it('should handle SUCCESS status and return json response', async () => {
    const response = mockResponse(STATUS_API.SUCCESS, mockJsonResponse);
    const config = {};
    const result = await buildResponse(response, config);
    expect(result).toEqual({ ...mockJsonResponse, statusHttp: STATUS_API.SUCCESS });
  });

  it('should handle SUCCESS status and return text response when config.text is true', async () => {
    const response = mockResponse(STATUS_API.SUCCESS, mockJsonResponse, false, true);
    const config = { text: true };
    const result = await buildResponse(response, config);

    expect(result).toBe(mockTextResponse);
  });

  it('should handle SUCCESS status and return blob response when config.blob is true', async () => {
    const response = mockResponse(STATUS_API.SUCCESS, mockJsonResponse, true);
    const config = { blob: true };
    const result = await buildResponse(response, config);

    expect(result).toBe(mockBlobResponse);
  });

  it('should throw an error for ERROR status', async () => {
    const response = mockResponse(STATUS_API.ERROR, {});
    const config = {};
    computeDataError.mockResolvedValue(new Error('Mock error'));

    await expect(buildResponse(response, config)).rejects.toThrow('Mock error');
  });

  it('should throw an error for WARNING status', async () => {
    const response = mockResponse(STATUS_API.WARNING, {});
    const config = {};
    computeDataError.mockResolvedValue(new Error('Mock warning'));

    await expect(buildResponse(response, config)).rejects.toThrow('Mock warning');
  });

  it('should return default statusHttp object for unhandled status codes', async () => {
    const response = mockResponse(mockStatus, {});
    const config = {};
    const result = await buildResponse(response, config);
  
    expect(result).toEqual({
      statusHttp: mockStatus,
    });
  });
  
});
