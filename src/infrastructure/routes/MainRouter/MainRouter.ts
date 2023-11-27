import express from 'express';
import { ENTITY_ROUTERS } from '../Routes';

export class MainRouter {
  router: express.Router;

  constructor() {
    this.router = express.Router();
    this.setupRoutes();
  }

  private setupRoutes = () => {
    this.router.get('/', (req, res) => {
      res.status(200).json({ message: 'Welcome to the Adoptame API!' });
    });

    ENTITY_ROUTERS.forEach((EntityRouter) => {
      this.router.use(new EntityRouter().router);
    });
  };
}
