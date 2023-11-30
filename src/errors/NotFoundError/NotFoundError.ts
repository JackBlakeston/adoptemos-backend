import { BaseError } from '@src/errors/BaseError';

export class NotFoundError extends BaseError {
  constructor(message: string) {
    super({ message, name: 'Not Found Error', statusCode: 404 });
  }
}
