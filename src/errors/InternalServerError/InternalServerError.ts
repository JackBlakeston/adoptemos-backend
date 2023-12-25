import { BaseError } from '@src/errors/BaseError';

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super({ message, name: 'Internal Server Error', statusCode: 500 });
  }
}
