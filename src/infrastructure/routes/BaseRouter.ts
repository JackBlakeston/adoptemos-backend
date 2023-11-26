import express, { RequestHandler } from 'express';
import { BaseController } from 'src/application/controllers/BaseController';
import { BaseEntity } from 'src/core/domain/entities/baseEntity/BaseEntity';
import { BaseRepositoryImpl } from 'src/infrastructure/repositories/baseRepositoryImpl/BaseRepositoryImpl';
import { HttpMethods, Url } from 'src/infrastructure/routes/Routes.types';

export type Route = [HttpMethods, Url, ...RequestHandler[]];

export class BaseRouter<K extends BaseEntity, T extends BaseController<K, BaseRepositoryImpl<K>>> {
  protected controller: T;
  public router: express.Router;

  constructor(controller: T) {
    this.router = express.Router();
    this.controller = controller;
  }

  private createRoute = ([method, path, ...callbacks]: Route) => {
    const boundCallbacks = callbacks.map((callback) => callback.bind(this.controller));
    this.router[method](path, ...boundCallbacks);
  };

  protected createRoutes = (routes: Route[]) => {
    routes.forEach((route) => {
      this.createRoute(route);
    });
  };
}
