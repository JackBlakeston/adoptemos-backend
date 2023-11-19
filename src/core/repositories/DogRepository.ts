import { Dog } from '../domain/entities/Dog';

export interface DogRepository {
  findById: (id: string) => Promise<Dog | null>;
  findAll: () => Promise<Dog[]>;
  create: (dog: Dog) => Promise<Dog>;
  update: (id: string, dog: Dog) => Promise<Dog | null>;
  delete: (id: string) => Promise<void>;
}
