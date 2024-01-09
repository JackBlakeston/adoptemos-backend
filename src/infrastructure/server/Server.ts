import express, { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import { MainRouter } from '@src/infrastructure/routes/MainRouter/MainRouter';
import { OpenApiService } from '@src/infrastructure/services/OpenApiService/OpenApiService';
import { StorageProviderService } from '@src/infrastructure/services/StorageProviderService/StorageProviderService';

import { getSwaggerDocument } from '@src/docs/getSwaggerDocument';
import swaggerUiOptions from '@src/docs/swaggerUiConfig.json';

export class Server {
  private app: Express;
  private router: MainRouter;

  constructor() {
    this.app = express();
    this.router = new MainRouter();

    this.configureMiddleware();
    this.initializeServices();
    this.configureSwagger();
    this.configureRoutes();
  }

  private initializeServices = () => {
    StorageProviderService.initialize();
    OpenApiService.initialize(this.app);
  };

  private configureMiddleware = () => {
    this.app.use(express.json({ limit: '5mb' }));
  };

  private configureSwagger = () => {
    const swaggerDocument = getSwaggerDocument();
    this.app.use('/openapi', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));
  };

  private configureRoutes = (): void => {
    this.app.use(this.router.router);
  };

  start = (port: number | string, callback?: () => void): void => {
    this.app.listen(port, callback);
  };
}
