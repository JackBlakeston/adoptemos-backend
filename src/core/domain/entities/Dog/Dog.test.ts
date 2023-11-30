import { Dog } from '@src/core/domain/entities/Dog/Dog';

describe('Dog Entity', () => {
  const name = 'Bob';
  const breed = 'Husky';

  describe('Dog constructor', () => {
    describe('WHEN invoked', () => {
      it('should create a dog instance', () => {
        const dog = new Dog({ name, breed });

        expect(dog).toBeInstanceOf(Dog);
        expect(dog.name).toBe(name);
        expect(dog.breed).toBe(breed);
      });

      it('should instantiate the entity without optional props', () => {
        const dog = new Dog({ name });

        expect(dog.name).toBe(name);
        expect(dog.breed).toBe(undefined);
      });
    });
  });
});
