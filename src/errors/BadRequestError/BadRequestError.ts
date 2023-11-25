import { BaseError } from '../BaseError';

export class BadRequestError extends BaseError {
  constructor(message: string) {
    super({ message, name: 'Bad Request Error', statusCode: 400 });
  }
}
