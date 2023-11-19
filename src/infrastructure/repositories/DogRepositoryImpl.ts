import { DogRepository } from 'src/core/repositories/DogRepository';
import { CreateDogDTO } from '../../application/dtos/createDogDTO';
import { Dog } from 'src/core/domain/entities/Dog';
import { BaseRepositoryImpl } from './baseRepositoryImpl/BaseRepositoryImpl';

export class DogRepositoryImpl extends BaseRepositoryImpl<Dog> implements DogRepository {
  async create(dogData: CreateDogDTO): Promise<Dog> {
    try {
      const createdDog = new this.model(dogData);
      const savedDog = await createdDog.save();
      return savedDog.toObject();
    } catch {
      throw new Error('Failed to create a dog.');
    }
  }

  async findById(id: string): Promise<Dog | null> {
    try {
      const dog = await this.model.findById(id).exec();
      return dog ? dog.toObject() : null;
    } catch {
      throw new Error('Failed to find the dog.');
    }
  }

  async findAll(): Promise<Dog[]> {
    try {
      const dogs = await this.model.find().exec();
      return dogs.map((dog) => dog.toObject());
    } catch (error) {
      throw new Error('Failed to retrieve dogs.');
    }
  }

  async update(id: string, dogData: CreateDogDTO): Promise<Dog | null> {
    try {
      const updatedDog = await this.model
        .findByIdAndUpdate(id, dogData, {
          new: true,
        })
        .exec();

      return updatedDog ? updatedDog.toObject() : null;
    } catch (error) {
      throw new Error('Failed to update the dog.');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.model.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new Error('Failed to delete the dog.');
    }
  }
}
