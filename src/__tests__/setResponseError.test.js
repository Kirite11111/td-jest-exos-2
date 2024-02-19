import { setResponseError, STATUS_HTTP, STATUS_API, STATUS_HTTP_MESSAGES } from '../setResponseError';

describe('setResponseError', () => {
  it('should return warning details for warning status codes', () => {
    const warningResponse = {
      response: {
        anomaly: { label: 'Warning label', detail: 'Warning detail' },
        status: `${STATUS_API.WARNING}1`,
      },
    };

    const expected = {
      label: 'Warning label',
      detail: 'Warning detail',
      type: 'danger',
      iconName: 'alert',
    };

    expect(setResponseError(warningResponse)).toEqual(expected);
  });

  it('should return error details for error status codes', () => {
    const errorResponse = {
      response: {
        anomaly: { label: 'Error label', detail: 'Error detail' },
        status: `${STATUS_API.ERROR}1`,
      },
    };

    const expected = {
      label: 'Error label',
      detail: 'Error detail',
    };

    expect(setResponseError(errorResponse)).toEqual(expected);
  });

  it('should use default messages if anomaly details are missing', () => {
    const errorResponse = {
      response: {
        status: STATUS_HTTP.NOTFOUND,
      },
    };
  
    const expected = {
      label: STATUS_HTTP_MESSAGES[STATUS_HTTP.NOTFOUND],
      detail: '',
      iconName: 'alert',
      type: 'danger',
    };
  
    expect(setResponseError(errorResponse)).toEqual(expected);
  });
  

  it('should return an empty object for non-error, non-warning statuses', () => {
    const successResponse = {
      response: {
        status: STATUS_HTTP.SUCCESS,
      },
    };

    expect(setResponseError(successResponse)).toEqual({});
  });

  it('should return an empty object for non-error, non-warning statuses', () => {
    const successResponse = {
      response: {
        status: STATUS_HTTP.SUCCESS,
      },
    };

    expect(setResponseError(successResponse)).toEqual({});
  });
});

