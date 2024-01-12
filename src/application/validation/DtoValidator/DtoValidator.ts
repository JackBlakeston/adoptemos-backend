import { validate, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { BaseController } from '@src/application/controllers/BaseController';
import { BaseDto } from '@src/application/dtos/BaseDto';

import { BadRequestError } from '@src/errors/BadRequestError/BadRequestError';

export class DtoValidator<T extends typeof BaseDto> {
  private DtoClass: typeof BaseDto;

  constructor(DtoClass: T) {
    this.DtoClass = DtoClass;
  }

  private getValidationErrorMessages = (errors: ValidationError[]): string[] => {
    return errors.flatMap(({ constraints }) => {
      return Object.values(constraints ?? {});
    });
  };

  private getOutputErrorMessage = (validationErrors: string[]): string => {
    return `Errors in request body: ${validationErrors.join(', ')}`;
  };

  validateDto = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    req.body = new this.DtoClass(req.body);
    const errors = await validate(req.body, { whitelist: true, forbidNonWhitelisted: true });

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
