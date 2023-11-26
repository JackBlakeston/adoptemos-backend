import { MockDto } from 'src/fixtures/ClassMocks';

describe('BaseDto', () => {
  describe('extended to create a DTO class', () => {
    describe('WHEN instantiating the extended DTO class', () => {
      it('should add all the declared properties to the constructor automatically', () => {
        const mockData = { requiredField: 'foo' };

        const mockDto = new MockDto(mockData);

        expect(mockDto.requiredField).toEqual('foo');
      });
    });
  });
});
