import express from 'express';
import { BaseController } from 'src/application/controllers/baseController/BaseController';
import { BaseRepositoryImpl } from 'src/infrastructure/repositories/baseRepositoryImpl/BaseRepositoryImpl';
import { Method, RequestCallback, Url } from 'src/infrastructure/routes/types/RouterTypes';

export type Route = [Method, Url, RequestCallback];

export class BaseRouter<K, T extends BaseController<K, BaseRepositoryImpl<K>>> {
  protected controller: T;
  public router: express.Router;

  constructor(controller: T) {
    this.router = express.Router();
    this.controller = controller;
  }

  private createRoute = ([method, path, callback]: Route) => {
    this.router[method](path, callback.bind(this.controller));
  };

  protected createRoutes = (routes: Route[]) => {
    routes.forEach((route) => {
      this.createRoute(route);
    });
  };
}
