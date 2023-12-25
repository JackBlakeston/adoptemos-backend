import { DogController } from '@src/application/controllers/DogController/DogController';
import { DogModel } from '@src/infrastructure/database/models/DogModel';
import { BaseRouter } from '@src/infrastructure/routes/Routers/BaseRouter';
import { Dog } from '@src/core/domain/entities/Dog/Dog';
import { HttpMethods } from '@src/infrastructure/routes/Routers/Routers.types';
import { CreateDogDto } from '@src/application/dtos/Dog/CreateDogDto/CreateDogDto';
import { DtoValidator } from '@src/application/validation/DtoValidator/DtoValidator';

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
