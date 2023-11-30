import { MockEntity } from '@src/fixtures/ClassMocks';
import { BaseEntityWithUrl } from '@src/core/domain/entities/BaseEntity';
import { EntityConstructorData } from '@src/core/domain/entities/Entities.types';

describe('BaseEntity', () => {
  const mockData = { requiredField: 'foo' };

  describe('extended to create an entity class', () => {
    describe('WHEN instantiating the extended entity class', () => {
      it('should assign all the declared properties in the constructor without having to assign them manually', () => {
        const mockEntity = new MockEntity(mockData);

        expect(mockEntity.requiredField).toEqual('foo');
      });

      it('shoulds add an ID to the instance', () => {
        const mockEntity = new MockEntity(mockData);

        expect(typeof mockEntity.id).toBe('string');
        expect(mockEntity.id).toHaveLength(36);
      });
    });
  });
});

describe('BaseEntityWithUrl', () => {
  class MockEntityWithUrl extends BaseEntityWithUrl {
    name?: string;

    constructor(data: EntityConstructorData<MockEntityWithUrl>) {
      super(data);
    }
  }

  describe('extended to create an entity class', () => {
    describe('WHEN instantiating the extended entity class', () => {
      it('should add a url to the entity', () => {
        const mockEntity = new MockEntityWithUrl({});

        expect(typeof mockEntity.url).toBe('string');
        expect(mockEntity.url).toHaveLength(14);
      });

      it('should add a url to the entity', () => {
        const name = 'Purslane';

        const mockEntity = new MockEntityWithUrl({ name });

        expect(mockEntity.name?.split('_')[0]).toBe(name);
      });
    });
  });
});
