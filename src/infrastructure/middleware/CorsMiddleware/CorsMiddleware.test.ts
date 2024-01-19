import { corsMiddleware } from '@src/infrastructure/middleware/CorsMiddleware/CorsMiddleware';
import { Request } from 'express';

import { getMockRequest, getMockResponse } from '@src/application/controllers/utils/testing/ControllerTestingUtils';

describe('corsMiddleware()', () => {
  const mockOrigin = 'foo-url';
  const mockAllowedOrigins = [mockOrigin];
  const mockHeaders = { origin: mockOrigin };
  const mockReq = getMockRequest({ mockHeaders });
  const mockRes = getMockResponse();
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('WHEN called', () => {
    it('should add the correct CORS headers to the response', () => {
      corsMiddleware()(mockReq, mockRes, mockNext);

      expect(mockRes.header).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
      expect(mockRes.header).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      expect(mockRes.header).toHaveBeenCalledWith(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      expect(mockRes.header).toHaveBeenCalledWith('Access-Control-Allow-Credentials', 'true');
    });

    it('should forward the request', () => {
      corsMiddleware()(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN called with an allowedOrigins arg and a whitelisted origin', () => {
    it('should allow access to the origin', () => {
      corsMiddleware(mockAllowedOrigins)(mockReq, mockRes, mockNext);

      expect(mockRes.header).toHaveBeenCalledWith('Access-Control-Allow-Origin', mockOrigin);
    });
  });

  describe('WHEN called with an allowedOrigins arg and a non whitelisted origin', () => {
    const unallowedOrigin = 'bad-origin';
    const mockReqWithUnallowedOrigin = { headers: { origin: unallowedOrigin } } as unknown as Request;

    corsMiddleware(mockAllowedOrigins)(mockReqWithUnallowedOrigin, mockRes, mockNext);

    it('should allow access to the origin', () => {
      expect(mockRes.header).not.toHaveBeenCalledWith('Access-Control-Allow-Origin', unallowedOrigin);
      expect(mockRes.header).not.toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
    });
  });
});
