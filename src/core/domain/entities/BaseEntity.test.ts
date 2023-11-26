import { MockEntity } from 'src/fixtures/ClassMocks';

describe('BaseEntity', () => {
  describe('extended to create an entity class', () => {
    describe('WHEN instantiating the extended entity class', () => {
      it('should add all the declared properties to the constructor automatically', () => {
        const mockData = { requiredField: 'foo' };

        const mockEntity = new MockEntity(mockData);

        expect(mockEntity.requiredField).toEqual('foo');
      });
    });
  });
});
