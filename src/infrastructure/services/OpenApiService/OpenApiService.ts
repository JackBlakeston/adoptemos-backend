import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import { getFormattedProjectName } from '@src/utils/GetFormattedProjectName/GetFormattedProjectName';

import swaggerAutogenDocument from '@src/docs/swaggerAutogen.json';
import swaggerUiOptions from '@src/docs/swaggerUiConfig.json';

const { API_URL } = process.env;

export class OpenApiService {
  static initialize = (app: Express) => {
    const swaggerDocument = this.getSwaggerDocument();
    app.use('/openapi', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerUiOptions));
  };

  private static getSwaggerInfo = () => {
    const projectName = getFormattedProjectName();

    return {
      title: `${projectName} API`,
      description: `API docs for the ${projectName} project`,
      version: '1.0.0',
    };
  };

  private static getSwaggerDocument = () => {
    return {
      info: this.getSwaggerInfo(),
      servers: [
        {
          url: API_URL,
          description: 'API url',
        },
      ],
      ...swaggerAutogenDocument,
    };
  };
}
