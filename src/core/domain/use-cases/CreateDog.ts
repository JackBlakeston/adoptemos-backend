import { DogRepository } from 'src/core/repositories/DogRepository';
import { Dog } from '../entities/Dog';

interface CreateDogInput {
  id: string;
  name: string;
  breed?: string;
}

export class CreateDog {
  private dogRepository: DogRepository;

  constructor(dogRepository: DogRepository) {
    this.dogRepository = dogRepository;
  }

  async execute(input: CreateDogInput): Promise<Dog> {
    const { name, breed, id } = input;

    const dog = new Dog({ name, breed, id });

    await this.dogRepository.create(dog);

    return dog;
  }
}
