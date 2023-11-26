import { Dog } from './Dog';

describe('Dog Entity', () => {
  describe('Dog constructor', () => {
    describe('WHEN invoked', () => {
      it('should create a dog instance', () => {
        const id = '42';
        const name = 'Bob';
        const breed = 'Husky';

        const dog = new Dog({ id, name, breed });

        expect(dog).toBeInstanceOf(Dog);
        expect(dog.id).toBe(id);
        expect(dog.name).toBe(name);
        expect(dog.breed).toBe(breed);
      });
    });
  });
});
