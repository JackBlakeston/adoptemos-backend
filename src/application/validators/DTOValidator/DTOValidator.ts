import { ValidationError, validate } from 'class-validator';
import { BadRequestError } from 'src/errors/BadRequestError/BadRequestError';
import { BaseDto } from '../../dtos/BaseDto';
import { NextFunction, Request, Response } from 'express';
import { BaseController } from '../../controllers/BaseController';

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
