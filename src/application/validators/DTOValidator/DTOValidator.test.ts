import { MockDTO } from 'src/fixtures/ClassMocks';
import { DTOValidator } from './DTOValidator';
import { getMockRequest, getMockResponse } from '../../controllers/utils/testing/ControllerTestingUtils';
import { Request, Response } from 'express';

describe('DTOValidator', () => {
  let mockReq: Request;
  let mockRes: Response;
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    mockRes = getMockResponse();
  });

  describe('validateDTO method', () => {
    describe('WHEN request body is valid', () => {
      it('should call the next function and should not send a response', async () => {
        const mockRequestBody = {
          requiredField: 'foo',
        };
        mockReq = getMockRequest(mockRequestBody);

        const validator = new DTOValidator(MockDTO);
        await validator.validateDTO(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith();
        expect(mockRes.send).not.toHaveBeenCalled();
      });
    });

    describe('WHEN request body is not valid', () => {
      it('should not call the next function and should send an error response with status 400', async () => {
        const mockRequestBody = {};
        mockReq = getMockRequest(mockRequestBody);

        const validator = new DTOValidator(MockDTO);
        await validator.validateDTO(mockReq, mockRes, mockNext);

        expect(mockNext).not.toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.send).toHaveBeenCalledWith({
          message: 'Errors in request body: requiredField should not be empty, requiredField must be a string',
          success: false,
        });
      });
    });
  });
});
