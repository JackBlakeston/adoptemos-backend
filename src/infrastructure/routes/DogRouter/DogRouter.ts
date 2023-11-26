import { DogController } from 'src/application/controllers/DogController/DogController';
import { DogModel } from '../../database/models/Dog.model';
import { BaseRouter } from '../BaseRouter';
import { Dog } from 'src/core/domain/entities/Dog/Dog';
import { HttpMethods } from 'src/infrastructure/routes/Routes.types';
import { DTOValidator } from 'src/application/validators/DTOValidator/DTOValidator';
import { CreateDogDTO } from 'src/application/dtos/createDogDTO';

const { Get, Post } = HttpMethods;

export class DogRouter extends BaseRouter<Dog, DogController> {
  constructor() {
    super(new DogController(DogModel));
    this.createRoutes([
      [Get, '/dogs', this.controller.getAllDogs],
      [Post, '/dogs', new DTOValidator(CreateDogDTO).validateDTO, this.controller.createDog],
    ]);
  }
}
