import { AuthenticationError } from './AuthenticationError';

describe('AuthenticationError', () => {
  describe('AuthenticationError constructor', () => {
    describe('WHEN invoked', () => {
      it('should create the instance correctly', () => {
        const mockMessage = 'Authentication error message';

        const error = new AuthenticationError(mockMessage);

        expect(error).toBeInstanceOf(AuthenticationError);
        expect(error.message).toBe(mockMessage);
        expect(error.name).toBe('Authentication Error');
        expect(error.statusCode).toBe(401);
      });
    });
  });
});
