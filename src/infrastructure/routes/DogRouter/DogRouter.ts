import { DogController } from 'src/application/controllers/DogController/DogController';
import { DogModel } from '../../database/models/Dog.model';
import { BaseRouter } from '../BaseRouter';
import { Dog } from 'src/core/domain/entities/Dog/Dog';
import { HttpMethods } from 'src/infrastructure/routes/Routes.types';
import { DtoValidator } from 'src/application/validators/DtoValidator/DtoValidator';
import { CreateDogDto } from 'src/application/dtos/Dog/CreateDogDto/CreateDogDto';

const { Get, Post } = HttpMethods;

export class DogRouter extends BaseRouter<Dog, DogController> {
  constructor() {
    super(new DogController(DogModel));
    this.createRoutes([
      [Get, '/dogs', this.controller.getAllDogs],
      [Post, '/dogs', new DtoValidator(CreateDogDto).validateDto, this.controller.createDog],
    ]);
  }
}
