import { DogUseCases } from '@src/core/domain/useCases/DogUseCases/DogUseCases';

import { DogModel } from '@src/infrastructure/database/models/DogModel/DogModel';
import { DogRepositoryImpl } from '@src/infrastructure/repositories/DogRepositoryImpl/DogRepositoryImpl';

import { mockCreateDogDto, mockDog } from '@src/fixtures/MockEntities/MockDogs';

jest.mock('@src/core/domain/entities/Dog/Dog', () => {
  return {
    Dog: jest.fn(() => mockDog),
  };
});

describe('DogUseCases', () => {
  const mockDogRepository = new DogRepositoryImpl(DogModel);
  const mockDogUseCases = new DogUseCases(mockDogRepository);

  describe('createDog method', () => {
    describe('WHEN invoked', () => {
      it('should create a dog and return the result', async () => {
        const dogRepositoryCreateSpy = jest.spyOn(DogRepositoryImpl.prototype, 'createDog');
        dogRepositoryCreateSpy.mockImplementation(async () => {
          return mockDog;
        });

        const result = await mockDogUseCases.createDog(mockCreateDogDto);

        expect(dogRepositoryCreateSpy).toHaveBeenCalledWith(mockDog);
        expect(result).toEqual(mockDog);
      });
    });
  });

  describe('getAllDogs method', () => {
    describe('WHEN invoked', () => {
      it('should call the repository getAllDogs method and return the result', async () => {
        const mockDogCollection = Array(3).fill(mockDog);
        const dogRepositorygetAllDogsSpy = jest.spyOn(DogRepositoryImpl.prototype, 'getAllDogs');
        dogRepositorygetAllDogsSpy.mockImplementation(async () => {
          return mockDogCollection;
        });

        const result = await mockDogUseCases.getAllDogs();

        expect(dogRepositorygetAllDogsSpy).toHaveBeenCalledWith();
        expect(result).toEqual(mockDogCollection);
      });
    });
  });
});
