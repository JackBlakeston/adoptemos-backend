import { validate,ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { BaseController } from '@src/application/controllers/BaseController';
import { BaseDto } from '@src/application/dtos/BaseDto';

import { BadRequestError } from '@src/errors/BadRequestError/BadRequestError';

export class DtoValidator<T extends typeof BaseDto> {
  private dtoClass: typeof BaseDto;

  constructor(dtoClass: T) {
    this.dtoClass = dtoClass;
  }

  private getValidationErrorMessages = (errors: ValidationError[]): string[] => {
    return errors.flatMap((error) => {
      return Object.values(error.constraints ?? {});
    });
  };

  private getOutputErrorMessage = (validationErrors: string[]): string => {
    return `Errors in request body: ${validationErrors.join(', ')}`;
  };

  validateDto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.body = new this.dtoClass(req.body);
    const errors = await validate(req.body);

    if (errors.length) {
      const validationErrorMessages = this.getValidationErrorMessages(errors);
      const outputErrorMessage = this.getOutputErrorMessage(validationErrorMessages);

      BaseController.sendErrorResponse(res, new BadRequestError(outputErrorMessage));
    }

    if (!errors.length) {
      next();
    }
  };
}
