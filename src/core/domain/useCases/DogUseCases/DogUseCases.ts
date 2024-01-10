import { Dog } from '@src/core/domain/entities/Dog/Dog';
import { BaseUseCase } from '@src/core/domain/useCases/BaseUseCase';

import { CreateDogDto } from '@src/application/dtos/Dog/CreateDogDto/CreateDogDto';

import { DogRepositoryImpl } from '@src/infrastructure/repositories/DogRepositoryImpl/DogRepositoryImpl';

export class DogUseCases extends BaseUseCase<Dog, DogRepositoryImpl> {
  async createDog(createDogDto: CreateDogDto): Promise<Dog> {
    const dogEntityConstructorData = await this.uploadImagesAndGetConstructorData<Dog, CreateDogDto>({
      dto: createDogDto,
      folderName: 'dogs',
      images: [{ dataPropName: 'imageData', urlPropName: 'imageUrl' }],
    });

    const dog = new Dog(dogEntityConstructorData);

    await this.repository.createDog(dog);

    return dog;
  }

  async getAllDogs(): Promise<Dog[]> {
    const dogs = await this.repository.getAllDogs();

    return dogs;
  }
}
