import { Dog } from '../../entities/Dog/Dog';
import { CreateDogDto } from 'src/application/dtos/Dog/CreateDogDto/CreateDogDto';
import { BaseUseCase } from '../BaseUseCase';
import { DogRepositoryImpl } from 'src/infrastructure/repositories/DogRepositoryImpl';

export class DogUseCases extends BaseUseCase<Dog, DogRepositoryImpl> {
  async createDog(createDogDto: CreateDogDto): Promise<Dog> {
    const dog = new Dog(createDogDto);
    await this.repository.createDog(dog);

    return dog;
  }

  async getAllDogs(): Promise<Dog[]> {
    const dogs = await this.repository.getAllDogs();

    return dogs;
  }
}
