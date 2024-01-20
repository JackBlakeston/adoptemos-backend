import { InternalServerError } from '@src/errors/InternalServerError/InternalServerError';

export const spyAndMockError = <U extends AnyObj>(
  UseCasesClass: U,
  method: keyof U['prototype'],
  errorMessage: string,
) => {
  jest.spyOn(UseCasesClass.prototype, method as string).mockImplementation(() => {
    throw new InternalServerError(errorMessage);
  });
};
