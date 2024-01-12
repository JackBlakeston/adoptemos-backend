import express from 'express';

import { ENDPOINT_ROUTERS } from '@src/infrastructure/routes/Routes';

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

    ENDPOINT_ROUTERS.forEach((EndpointRouter) => {
      this.router.use(new EndpointRouter().router);
    });
  };
}
