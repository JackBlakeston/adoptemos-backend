import { corsMiddleware } from '@src/infrastructure/middleware/CorsMiddleware/CorsMiddleware';
import { Request, Response } from 'express';

describe('corsMiddleware()', () => {
  const mockOrigin = 'foo-url';
  const mockAllowedOrigins = [mockOrigin];
  const mockHeader = jest.fn();
  const mockNext = jest.fn();
  const mockReq = { headers: { origin: mockOrigin } } as unknown as Request;
  const mockRes = { header: mockHeader } as unknown as Response;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('WHEN called', () => {
    it('should add the correct CORS headers to the response', () => {
      corsMiddleware()(mockReq, mockRes, mockNext);

      expect(mockHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
      expect(mockHeader).toHaveBeenCalledWith('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      expect(mockHeader).toHaveBeenCalledWith(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      expect(mockHeader).toHaveBeenCalledWith('Access-Control-Allow-Credentials', 'true');
    });

    it('should forward the request', () => {
      corsMiddleware()(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledTimes(1);
    });
  });

  describe('WHEN called with an allowedOrigins arg and a whitelisted origin', () => {
    it('should allow access to the origin', () => {
      corsMiddleware(mockAllowedOrigins)(mockReq, mockRes, mockNext);

      expect(mockHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', mockOrigin);
    });
  });

  describe('WHEN called with an allowedOrigins arg and a non whitelisted origin', () => {
    const unallowedOrigin = 'bad-origin';
    const mockReqWithUnallowedOrigin = { headers: { origin: unallowedOrigin } } as unknown as Request;

    corsMiddleware(mockAllowedOrigins)(mockReqWithUnallowedOrigin, mockRes, mockNext);

    it('should allow access to the origin', () => {
      expect(mockHeader).not.toHaveBeenCalledWith('Access-Control-Allow-Origin', unallowedOrigin);
      expect(mockHeader).not.toHaveBeenCalledWith('Access-Control-Allow-Origin', '*');
    });
  });
});
