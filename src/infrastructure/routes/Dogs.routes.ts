import { DogController } from 'src/application/controllers/DogController';
import { DogModel } from '../database/models/Dog.model';
import { BaseRouter } from './baseRouter/BaseRouter';
import { Dog } from 'src/core/domain/entities/Dog';
import { Method } from 'src/infrastructure/routes/types/RouterTypes';

const { Get, Post } = Method;

export class DogsRouter extends BaseRouter<Dog, DogController> {
  constructor() {
    super(new DogController(DogModel));
    this.createRoutes([
      [Get, '/dogs', this.controller.getAllDogs],
      [Post, '/dogs', this.controller.createDog],
    ]);
  }
}
