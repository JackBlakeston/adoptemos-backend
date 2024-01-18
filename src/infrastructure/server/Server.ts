import { corsMiddleware } from '@src/infrastructure/middleware/CorsMiddleware/CorsMiddleware';
import express, { json } from 'express';

import { MainRouter } from '@src/infrastructure/routes/MainRouter/MainRouter';
import { OpenApiService } from '@src/infrastructure/services/OpenApiService/OpenApiService';
import { StorageProviderService } from '@src/infrastructure/services/StorageProviderService/StorageProviderService';

import { CORS_WHITELIST } from '@src/config/corsWhitelist';

export class Server {
  app: express.Express;
  private router: MainRouter;

  constructor() {
    this.app = express();
    this.router = new MainRouter();

    this.configureMiddleware();
    this.initializeServices();
    this.configureRoutes();
  }

  private initializeServices = () => {
    StorageProviderService.initialize();
    OpenApiService.initialize(this.app);
  };

  private configureMiddleware = () => {
    this.app.use(json({ limit: '5mb' }));
    this.app.use(corsMiddleware(CORS_WHITELIST));
  };

  private configureRoutes = (): void => {
    this.app.use(this.router.router);
  };

  start = (port: number | string, callback?: () => void): void => {
    this.app.listen(port, callback);
  };
}
