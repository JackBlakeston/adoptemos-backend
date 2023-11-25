import { BaseError } from '../BaseError';

export class AuthenticationError extends BaseError {
  constructor(message: string) {
    super({ message, name: 'Authentication Error', statusCode: 401 });
  }
}
