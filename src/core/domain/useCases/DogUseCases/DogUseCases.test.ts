import { DogModel } from 'src/infrastructure/database/models/Dog.model';
import { DogRepositoryImpl } from 'src/infrastructure/repositories/DogRepositoryImpl';
import { DogUseCases } from './DogUseCases';
import { CreateDogDto } from 'src/application/dtos/Dog/CreateDogDto/CreateDogDto';

describe('DogUseCases', () => {
  const mockDogData = { id: '42', name: 'Bob', breed: 'Spaniel' };
  const mockDogRepository = new DogRepositoryImpl(DogModel);
  const mockDogUseCases = new DogUseCases(mockDogRepository);

  describe('createDog method', () => {
    describe('WHEN invoked', () => {
      it('should call the repository createDog method with a dog entity created from the DTO and return the result', async () => {
        const mockDogDto = new CreateDogDto(mockDogData);
        const dogRepositoryCreateSpy = jest.spyOn(DogRepositoryImpl.prototype, 'createDog');
        dogRepositoryCreateSpy.mockImplementation(async (dogDto: CreateDogDto) => {
          return dogDto;
        });

        const result = await mockDogUseCases.createDog(mockDogDto);

        expect(dogRepositoryCreateSpy).toHaveBeenCalledWith(mockDogData);
        expect(result).toEqual(mockDogData);
      });
    });
  });

  describe('getAllDogs method', () => {
    describe('WHEN invoked', () => {
      it('should call the repository getAllDogs method and return the result', async () => {
        const mockDogCollection = Array(3).fill(mockDogData);
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
