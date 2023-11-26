import { Request, Response } from 'express';
import { Model } from 'mongoose';
import { DogRepositoryImpl } from '../../../infrastructure/repositories/DogRepositoryImpl';
import { Dog } from '../../../core/domain/entities/Dog/Dog';
import { CreateDogDTO } from '../../dtos/createDogDTO';
import { BaseController } from '../BaseController';
import { DogUseCases } from 'src/core/domain/useCases/DogUseCases/DogUseCases';

export class DogController extends BaseController<Dog, DogRepositoryImpl> {
  constructor(dogModel: Model<Dog>) {
    super(new DogRepositoryImpl(dogModel));
  }

  async createDog(req: Request, res: Response): Promise<void> {
    try {
      const createDogDTO = new CreateDogDTO(req.body);
      const dogUseCases = new DogUseCases(this.repository);
      const newDog = await dogUseCases.createDog(createDogDTO);

      BaseController.sendSuccessResponse(res, newDog, 201);
    } catch (error) {
      BaseController.sendErrorResponse(res, error);
    }
  }

  async getAllDogs(req: Request, res: Response): Promise<void> {
    try {
      const dogUseCases = new DogUseCases(this.repository);
      const allDogs = await dogUseCases.getAllDogs();

      BaseController.sendSuccessResponse(res, allDogs, 200);
    } catch (error) {
      BaseController.sendErrorResponse(res, error);
    }
  }
}
