import { Dog } from 'src/core/domain/entities/Dog/Dog';
import { CreateDogDto } from './CreateDogDto';
import { validate } from 'class-validator';

describe('CreateDogDto', () => {
  const mockCreateDogReqBody: Dog = { id: '42', name: 'Bob', breed: 'Spaniel' };

  describe('validation', () => {
    describe('WHEN the dto is valid', () => {
      it('should pass validation', async () => {
        const dogDto = new CreateDogDto(mockCreateDogReqBody);

        const errors = await validate(dogDto);

        expect(errors.length).toBe(0);
      });
    });

    describe('WHEN the dto is valid but does not have optional props', () => {
      it('should pass validation', async () => {
        const dogDto = new CreateDogDto({ id: '42', name: 'Pacote' });

        const errors = await validate(dogDto);

        expect(errors.length).toBe(0);
      });
    });

    describe.each`
      overridenProps         | constraint      | expectedMessage
      ${{ name: '' }}        | ${'isNotEmpty'} | ${'name should not be empty'}
      ${{ name: 42 }}        | ${'isString'}   | ${'name must be a string'}
      ${{ name: undefined }} | ${'isString'}   | ${'name must be a string'}
      ${{ id: '' }}          | ${'isNotEmpty'} | ${'id should not be empty'}
      ${{ id: 42 }}          | ${'isString'}   | ${'id must be a string'}
      ${{ id: undefined }}   | ${'isString'}   | ${'id must be a string'}
      ${{ breed: '' }}       | ${'isNotEmpty'} | ${'breed should not be empty'}
      ${{ breed: 42 }}       | ${'isString'}   | ${'breed must be a string'}
    `(
      'WHEN breaking the constraint $constraint with $overridenProps',
      ({ overridenProps, constraint, expectedMessage }) => {
        it(`should return the error ${constraint}: ${expectedMessage}`, async () => {
          const dogDto = new CreateDogDto({ ...mockCreateDogReqBody, ...overridenProps });

          const errors = await validate(dogDto);

          expect(errors[0].constraints).toHaveProperty(constraint, expectedMessage);
        });
      },
    );
  });
});
