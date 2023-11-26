import { DogRepository } from 'src/core/repositories/DogRepository';
import { CreateDogDto } from '../../application/dtos/Dog/CreateDogDto/CreateDogDto';
import { Dog } from 'src/core/domain/entities/Dog/Dog';
import { BaseRepositoryImpl } from './baseRepositoryImpl/BaseRepositoryImpl';

export class DogRepositoryImpl extends BaseRepositoryImpl<Dog> implements DogRepository {
  async createDog(dogDto: CreateDogDto): Promise<Dog> {
    try {
      const createdDog = new this.model(dogDto);
      const savedDog = await createdDog.save();
      return savedDog.toObject();
    } catch {
      throw new Error('Failed to create a dog.');
    }
  }

  async findDogById(id: string): Promise<Dog | null> {
    try {
      const dog = await this.model.findById(id).exec();
      return dog ? dog.toObject() : null;
    } catch {
      throw new Error('Failed to find the dog.');
    }
  }

  async getAllDogs(): Promise<Dog[]> {
    try {
      const dogs = await this.model.find().exec();
      return dogs.map((dog) => dog.toObject());
    } catch (error) {
      throw new Error('Failed to retrieve dogs.');
    }
  }

  async updateDog(id: string, dogData: CreateDogDto): Promise<Dog | null> {
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

  async deleteDog(id: string): Promise<void> {
    try {
      await this.model.findByIdAndRemove(id).exec();
    } catch (error) {
      throw new Error('Failed to delete the dog.');
    }
  }
}
