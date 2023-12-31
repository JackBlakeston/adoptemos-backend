import express, { Express, RequestHandler } from 'express';

import { MainRouter } from '@src/infrastructure/routes/MainRouter/MainRouter';

export class Server {
  private readonly app: Express;
  private router: MainRouter;

  constructor() {
    this.app = express();
    this.use(express.json());
    this.router = new MainRouter();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.app.use(this.router.router);
  }

  use(middleware: RequestHandler): void {
    this.app.use(middleware);
  }

  start(port: number | string, callback?: () => void): void {
    this.app.listen(port, callback);
  }
}
