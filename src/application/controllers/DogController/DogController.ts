import { Request, Response } from 'express';
import { Model } from 'mongoose';

import { Dog } from '@src/core/domain/entities/Dog/Dog';
import { DogUseCases } from '@src/core/domain/useCases/DogUseCases/DogUseCases';

import { BaseController } from '@src/application/controllers/BaseController';
import { CreateDogDto } from '@src/application/dtos/Dog/CreateDogDto/CreateDogDto';

import { DogRepositoryImpl } from '@src/infrastructure/repositories/DogRepositoryImpl/DogRepositoryImpl';

export class DogController extends BaseController<Dog, DogRepositoryImpl> {
  constructor(dogModel: Model<Dog>) {
    super(new DogRepositoryImpl(dogModel));
  }

  async createDog(req: Request, res: Response): Promise<void> {
    try {
      const createDogDto = new CreateDogDto(req.body);
      const dogUseCases = new DogUseCases(this.repository);
      const newDog = await dogUseCases.createDog(createDogDto);

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
