import { BadRequestError } from './BadRequestError';

describe('BadRequestError', () => {
  describe('BadRequestError constructor', () => {
    describe('WHEN invoked', () => {
      it('should create the instance correctly', () => {
        const mockMessage = 'Bad request error message';

        const error = new BadRequestError(mockMessage);

        expect(error).toBeInstanceOf(BadRequestError);
        expect(error.message).toBe(mockMessage);
        expect(error.name).toBe('Bad Request Error');
        expect(error.statusCode).toBe(400);
      });
    });
  });
});
