import express, { Express, RequestHandler } from 'express';
import { router } from '../routes/Routes';

export class AdoptemosServer {
  private readonly app: Express;

  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  configureRoutes(): void {
    this.app.use(router);
  }

  use(middleware: RequestHandler): void {
    this.app.use(middleware);
  }

  start(port: number | string, callback?: () => void): void {
    this.app.listen(port, callback);
  }
}
