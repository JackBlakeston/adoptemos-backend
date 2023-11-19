import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { DogRepositoryImpl } from '../../infrastructure/repositories/DogRepositoryImpl';
import { Dog } from '../../core/domain/entities/Dog';
import { CreateDog } from 'src/core/domain/use-cases/CreateDog';
import { CreateDogDTO } from '../dtos/createDogDTO';
import { BaseController } from './baseController/BaseController';

export class DogController extends BaseController<Dog, DogRepositoryImpl> {
  constructor(dogModel: Model<Dog>) {
    super(new DogRepositoryImpl(dogModel));
  }

  async createDog(req: Request, res: Response): Promise<void> {
    try {
      const { name, breed, id } = req.body;
      const createDogUseCase = new CreateDog(this.repository);
      const createDogDTO: CreateDogDTO = { name, breed, id };
      const newDog = await createDogUseCase.execute(createDogDTO);

      res.status(201).send({
        success: true,
        data: newDog,
      });
    } catch (error) {
      res.status(400).send({
        success: false,
        message: (error as Error).message,
      });
    }
  }

  async getAllDogs(req: Request, res: Response): Promise<void> {
    try {
      const dogs = await this.repository.findAll();
      res.status(200).json(dogs);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
