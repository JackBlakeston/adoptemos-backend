import { Dog } from '../../entities/Dog/Dog';
import { CreateDogDTO } from 'src/application/dtos/createDogDTO';
import { BaseUseCase } from '../BaseUseCase';
import { DogRepositoryImpl } from 'src/infrastructure/repositories/DogRepositoryImpl';

export class DogUseCases extends BaseUseCase<Dog, DogRepositoryImpl> {
  async createDog(createDogDTO: CreateDogDTO): Promise<Dog> {
    const dog = new Dog(createDogDTO);
    await this.repository.createDog(dog);

    return dog;
  }

  async getAllDogs(): Promise<Dog[]> {
    const dogs = await this.repository.getAllDogs();

    return dogs;
  }
}
