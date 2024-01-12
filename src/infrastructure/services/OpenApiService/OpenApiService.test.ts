import express from 'express';
import swaggerUi from 'swagger-ui-express';

jest.mock('swagger-ui-express', () => ({
  __esModule: true,
  default: {
    serve: jest.fn(),
    setup: jest.fn(),
  },
}));
jest.mock('express', () => () => ({
  use: jest.fn(),
}));

describe('OpenApiService', () => {
  const oldEnv = process.env;

  afterEach(() => {
    process.env = oldEnv;
    jest.resetModules();
  });

  describe('initialize()', () => {
    describe('WHEN called', () => {
      const mockName = 'Foo';
      const mockUrl = 'foo-url';
      const mockExpressApp = express();

      const getTestClass = async () => {
        process.env.APP_NAME = mockName;
        process.env.API_URL = mockUrl;
        return await import('@src/infrastructure/services/OpenApiService/OpenApiService');
      };

      it('should initialize the openapi service', async () => {
        const { OpenApiService } = await getTestClass();
        const useSpy = jest.spyOn(mockExpressApp, 'use');

        OpenApiService.initialize(mockExpressApp);

        expect(useSpy).toHaveBeenCalledTimes(1);
        expect(useSpy.mock.calls[0][0]).toEqual('/openapi');
      });

      it('should add the correct docs info to the openapi docs', async () => {
        const { OpenApiService } = await getTestClass();
        const setupSpy = jest.spyOn(swaggerUi, 'setup');

        OpenApiService.initialize(mockExpressApp);

        expect(setupSpy).toHaveBeenCalledTimes(1);
        const swaggerDocs = setupSpy.mock.calls[0][0] as AnyObj;
        expect(swaggerDocs.info).toEqual({
          title: `${mockName} API`,
          description: `API docs for the ${mockName} project`,
          version: '1.0.0',
        });
      });
    });
  });
});
