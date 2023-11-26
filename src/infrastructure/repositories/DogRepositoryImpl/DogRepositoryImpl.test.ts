import { DogRepositoryImpl } from './DogRepositoryImpl';
import { CreateDogDto } from 'src/application/dtos/Dog/CreateDogDto/CreateDogDto';
import { DogModel } from 'src/infrastructure/database/models/Dog.model';
import { Dog } from 'src/core/domain/entities/Dog/Dog';
import { useMongoTestingEnvironment } from '../utils/testing/RepositoriesTestingUtils';
import { InternalServerError } from 'src/errors/InternalServerError/InternalServerError';

describe('DogRepositoryImpl', () => {
  const mockDogData: Dog = { id: '42', name: 'Bob', breed: 'Spaniel' };
  const dogRepository = new DogRepositoryImpl(DogModel);

  useMongoTestingEnvironment();

  describe('createDog method', () => {
    describe('WHEN creating a dog successfully', () => {
      it('should create the dog in the db and return the created dog', async () => {
        const mockDogDto = new CreateDogDto(mockDogData);

        const createdDog = await dogRepository.createDog(mockDogDto);
        const savedDbDogs = await DogModel.find().exec();
        const savedDogs = savedDbDogs.map((dog) => dog.toObject());

        expect(createdDog).toEqual(mockDogData);
        expect(savedDogs).toEqual([mockDogData]);
      });
    });

    describe('WHEN failing to create a dog', () => {
      it('should throw the correct error', async () => {
        try {
          await dogRepository.createDog(new CreateDogDto({} as CreateDogDto));
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
        const dogDocument = new DogModel(mockDogData);
        await dogDocument.save();

        const savedDogs = await dogRepository.getAllDogs();

        expect(savedDogs).toEqual([mockDogData]);
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
