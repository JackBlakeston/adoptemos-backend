import { InternalServerError } from './InternalServerError';

describe('InternalServerError', () => {
  describe('constructor', () => {
    describe('WHEN invoked', () => {
      it('should create the instance correctly', () => {
        const mockMessage = 'Internal server error message';

        const error = new InternalServerError(mockMessage);

        expect(error).toBeInstanceOf(InternalServerError);
        expect(error.message).toBe(mockMessage);
        expect(error.name).toBe('Internal Server Error');
        expect(error.statusCode).toBe(500);
      });
    });
  });
});
