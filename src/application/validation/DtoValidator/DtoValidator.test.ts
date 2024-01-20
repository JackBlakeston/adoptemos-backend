import { Request, Response } from 'express';

import { DtoValidator } from '@src/application/validation/DtoValidator/DtoValidator';

import { MockDto } from '@src/tests/fixtures/MockBaseClasses';
import { getMockRequest } from '@src/tests/fixtures/MockRequest';
import { getMockResponse } from '@src/tests/fixtures/MockResponse';

describe('DtoValidator', () => {
  let mockReq: Request;
  let mockRes: Response;
  const mockNext = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
    mockRes = getMockResponse();
  });

  describe('validateDto method', () => {
    describe('WHEN request body is valid', () => {
      it('should call the next function and should not send a response', async () => {
        const mockRequestBody = {
          requiredField: 'foo',
        };
        mockReq = getMockRequest({ mockBody: mockRequestBody });

        const validator = new DtoValidator(MockDto);
        await validator.validateDto(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith();
        expect(mockRes.send).not.toHaveBeenCalled();
      });
    });

    describe('WHEN request body is not valid', () => {
      it('should not call the next function and should send an error response with status 400', async () => {
        mockReq = getMockRequest({});

        const validator = new DtoValidator(MockDto);
        await validator.validateDto(mockReq, mockRes, mockNext);

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
