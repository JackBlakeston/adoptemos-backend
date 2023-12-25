import { NotFoundError } from '@src/errors/NotFoundError/NotFoundError';

describe('NotFoundError', () => {
  describe('NotFoundError constructor', () => {
    describe('WHEN invoked', () => {
      it('should create the instance correctly', () => {
        const mockMessage = 'Not found error message';

        const error = new NotFoundError(mockMessage);

        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.message).toBe(mockMessage);
        expect(error.name).toBe('Not Found Error');
        expect(error.statusCode).toBe(404);
      });
    });
  });
});
