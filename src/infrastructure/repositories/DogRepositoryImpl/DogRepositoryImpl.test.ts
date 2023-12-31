import { Dog } from '@src/core/domain/entities/Dog/Dog';

import { DogModel } from '@src/infrastructure/database/models/DogModel/DogModel';
import { DogRepositoryImpl } from '@src/infrastructure/repositories/DogRepositoryImpl/DogRepositoryImpl';
import { useMongoTestingEnvironment } from '@src/infrastructure/repositories/utils/testing/RepositoriesTestingUtils';

import { InternalServerError } from '@src/errors/InternalServerError/InternalServerError';

describe('DogRepositoryImpl', () => {
  const mockDog: Dog = new Dog({ name: 'Bob', breed: 'Spaniel' });
  const dogRepository = new DogRepositoryImpl(DogModel);

  useMongoTestingEnvironment();

  describe('createDog method', () => {
    describe('WHEN creating a dog successfully', () => {
      it('should create the dog in the db and return the created dog', async () => {
        const createdDog = await dogRepository.createDog(mockDog);
        const savedDbDogs = await DogModel.find().exec();
        const savedDogs = savedDbDogs.map((dog) => dog.toObject());

        expect(createdDog).toEqual(mockDog);
        expect(savedDogs).toEqual([mockDog]);
      });
    });

    describe('WHEN failing to create a dog', () => {
      it('should throw the correct error', async () => {
        try {
          await dogRepository.createDog({} as Dog);
        } catch (error) {
          if (error instanceof Error) {
            expect(error instanceof InternalServerError).toBe(true);
            expect(error.message).toEqual('Failed to create a dog');
          }
        }
      });
    });
  });

  describe('getAllDogs method', () => {
    describe('WHEN getting all dogs successfully', () => {
      it('should return all dogs in db', async () => {
        const dogDocument = new DogModel(mockDog);
        await dogDocument.save();

        const savedDogs = await dogRepository.getAllDogs();

        expect(savedDogs).toEqual([mockDog]);
      });
    });

    describe('WHEN failing to get all dogs', () => {
      it('should throw the correct error', async () => {
        jest.spyOn(DogModel, 'find').mockImplementation(() => {
          throw new InternalServerError('Test error');
        });

        try {
          await dogRepository.getAllDogs();
        } catch (error) {
          if (error instanceof Error) {
            expect(error instanceof InternalServerError).toBe(true);
            expect(error.message).toEqual('Failed to get dogs');
          }
        }
      });
    });
  });
});
