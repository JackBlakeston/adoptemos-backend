import { validate } from 'class-validator';

import { CreateDogDto } from '@src/application/dtos/Dog/CreateDogDto/CreateDogDto';

describe('CreateDogDto', () => {
  const mockCreateDogReqBody: CreateDogDto = { name: 'bob', breed: 'spaniel' };

  describe('validation', () => {
    describe('WHEN the dto is valid', () => {
      it('should pass validation', async () => {
        const createDogDto = new CreateDogDto(mockCreateDogReqBody);

        const errors = await validate(createDogDto);

        expect(errors.length).toBe(0);
      });
    });

    describe('WHEN the dto is valid but does not have optional props', () => {
      it('should pass validation', async () => {
        const createDogDto = new CreateDogDto({ name: 'Pacote' });

        const errors = await validate(createDogDto);

        expect(errors.length).toBe(0);
      });
    });

    describe.each`
      overridenProps         | constraint      | expectedMessage
      ${{ name: '' }}        | ${'isNotEmpty'} | ${'name should not be empty'}
      ${{ name: 42 }}        | ${'isString'}   | ${'name must be a string'}
      ${{ name: undefined }} | ${'isString'}   | ${'name must be a string'}
      ${{ breed: '' }}       | ${'isNotEmpty'} | ${'breed should not be empty'}
      ${{ breed: 42 }}       | ${'isString'}   | ${'breed must be a string'}
    `(
      'WHEN breaking the constraint $constraint with $overridenProps',
      ({ overridenProps, constraint, expectedMessage }) => {
        it(`should return the error ${constraint}: ${expectedMessage}`, async () => {
          const createDogDto = new CreateDogDto({ ...mockCreateDogReqBody, ...overridenProps });

          const errors = await validate(createDogDto);

          expect(errors[0].constraints).toHaveProperty(constraint, expectedMessage);
        });
      },
    );
  });
});
