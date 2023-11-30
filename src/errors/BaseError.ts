import { ErrorData } from '@src/errors/Errors.types';

export class BaseError extends Error {
  statusCode: number;

  constructor({ message, name, statusCode }: ErrorData) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}
