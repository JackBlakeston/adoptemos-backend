import { Response } from 'express';
import { BaseController } from './BaseController';
import {
  getErrorResponseObject,
  getMockResponse,
  getSuccessResponseObject,
} from './utils/testing/ControllerTestingUtils';
import { NotFoundError } from 'src/errors/NotFoundError/NotFoundError';

describe('BaseController', () => {
  const mockData = { color: 'red' };
  const mockErrorMessage = 'Test error message';

  let mockRes: Response;

  beforeEach(() => {
    jest.resetAllMocks();
    mockRes = getMockResponse();
  });

  describe('sendSuccessResponse method', () => {
    describe('WHEN invoked', () => {
      it('should send a response with the received data and status', async () => {
        const mockStatusCode = 201;

        BaseController.sendSuccessResponse(mockRes, mockData, mockStatusCode);

        expect(mockRes.status).toHaveBeenCalledWith(mockStatusCode);
        expect(mockRes.send).toHaveBeenCalledWith(getSuccessResponseObject(mockData));
      });
    });
  });

  describe('sendErrorResponse method', () => {
    describe('WHEN invoked with an error of a known type', () => {
      it('should send a response with the error message and the correct status for that error type', async () => {
        const expectedStatusCode = 404;

        BaseController.sendErrorResponse(mockRes, new NotFoundError(mockErrorMessage));

        expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(mockRes.send).toHaveBeenCalledWith(getErrorResponseObject(mockErrorMessage));
      });
    });

    describe('WHEN invoked with an error of an unknown type', () => {
      it('should send a response with the error message and status 500', async () => {
        const expectedStatusCode = 500;

        BaseController.sendErrorResponse(mockRes, new Error(mockErrorMessage));

        expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(mockRes.send).toHaveBeenCalledWith(getErrorResponseObject(mockErrorMessage));
      });
    });

    describe('WHEN invoked with something that is not an error', () => {
      it('should send a response with the correct message and status 500', async () => {
        const expectedErrorMessage = 'An unknown error has ocurred';
        const expectedStatusCode = 500;

        BaseController.sendErrorResponse(mockRes, {});

        expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(mockRes.send).toHaveBeenCalledWith(getErrorResponseObject(expectedErrorMessage));
      });
    });
  });
});
