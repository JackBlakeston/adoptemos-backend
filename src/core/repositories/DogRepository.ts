import { Dog } from '@src/core/domain/entities/Dog/Dog';

export interface DogRepository {
  findDogById: (id: string) => Promise<Dog | null>;
  getAllDogs: () => Promise<Dog[]>;
  createDog: (dog: Dog) => Promise<Dog>;
  updateDog: (id: string, dog: Dog) => Promise<Dog | null>;
  deleteDog: (id: string) => Promise<void>;
}
