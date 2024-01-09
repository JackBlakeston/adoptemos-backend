import { Dog } from '@src/core/domain/entities/Dog/Dog';
import { DogUseCases } from '@src/core/domain/useCases/DogUseCases/DogUseCases';

import { DogModel } from '@src/infrastructure/database/models/DogModel/DogModel';
import { DogRepositoryImpl } from '@src/infrastructure/repositories/DogRepositoryImpl/DogRepositoryImpl';

import { mockCreateDogDto, mockDog } from '@src/fixtures/MockEntities/MockDog';

jest.mock('@src/core/domain/entities/Dog/Dog', () => {
  return {
    Dog: jest.fn((dog) => dog),
  };
});
const mockDogConstructor = Dog as jest.Mock;

describe('DogUseCases', () => {
  const mockDogRepository = new DogRepositoryImpl(DogModel);
  const mockDogUseCases = new DogUseCases(mockDogRepository);

  beforeEach(() => {
    mockDogConstructor.mockClear();
  });

  describe('createDog method', () => {
    const dogRepositoryCreateSpy = jest.spyOn(DogRepositoryImpl.prototype, 'createDog');
    dogRepositoryCreateSpy.mockImplementation(async (dog: Dog) => {
      return dog;
    });

    describe('WHEN invoked', () => {
      it('should create a dog and return the result', async () => {
        mockDogConstructor.mockImplementationOnce(() => mockDog);

        const result = await mockDogUseCases.createDog(mockCreateDogDto);

        expect(mockDogConstructor).toHaveBeenCalledWith(mockCreateDogDto);
        expect(dogRepositoryCreateSpy).toHaveBeenCalledWith(mockDog);
        expect(result).toEqual(mockDog);
      });
    });

    describe('WHEN invoked with a dto with an imageData prop', () => {
      it('should upload the image and add an imageUrl prop', async () => {
        mockDogConstructor.mockImplementationOnce((dog) => dog);
        const mockUrl = 'mock-url';
        const uploadEncodedImageSpy = jest.spyOn(mockDogUseCases, 'uploadEncodedImage');
        uploadEncodedImageSpy.mockImplementation(async () => {
          return mockUrl;
        });

        const mockDtoWithImage = { ...mockCreateDogDto, imageData: 'foo' };

        const result = await mockDogUseCases.createDog(mockDtoWithImage);

        expect(result.imageUrl).toEqual(mockUrl);
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
