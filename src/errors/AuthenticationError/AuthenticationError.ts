import { BaseError } from '@src/errors/BaseError';

export class AuthenticationError extends BaseError {
  constructor(message: string) {
    super({ message, name: 'Authentication Error', statusCode: 401 });
  }
}
