import { BaseError } from './BaseError';
import { ErrorData } from './Errors.types';

const mockErrorData: ErrorData = {
  message: 'Test error message',
  name: 'TestError',
  statusCode: 400,
};

describe('BaseError', () => {
  describe('BaseError constructor', () => {
    describe('WHEN invoked', () => {
      it('should create the instance correctly', () => {
        const error = new BaseError(mockErrorData);

        expect(error).toBeInstanceOf(BaseError);
        expect(error.message).toBe(mockErrorData.message);
        expect(error.name).toBe(mockErrorData.name);
        expect(error.statusCode).toBe(mockErrorData.statusCode);
      });
    });
  });

  describe('toString method', () => {
    describe('WHEN invoked', () => {
      it('should have the correct name and message', () => {
        const error = new BaseError(mockErrorData);

        expect(error.toString()).toBe('TestError: Test error message');
      });
    });
  });
});
