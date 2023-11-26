import { BaseError } from '../BaseError';

export class InternalServerError extends BaseError {
  constructor(message: string) {
    super({ message, name: 'Internal Server Error', statusCode: 500 });
  }
}
