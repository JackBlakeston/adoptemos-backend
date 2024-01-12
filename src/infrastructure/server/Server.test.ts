import express from 'express';

import { MainRouter } from '@src/infrastructure/routes/MainRouter/MainRouter';
import { Server } from '@src/infrastructure/server/Server';
import { OpenApiService } from '@src/infrastructure/services/OpenApiService/OpenApiService';

jest.mock('@src/infrastructure/routes/MainRouter/MainRouter', () => {
  return {
    MainRouter: jest.fn(),
  };
});
jest.mock('@src/infrastructure/services/StorageProviderService/StorageProviderService', () => {
  return {
    StorageProviderService: {
      initialize: jest.fn(),
    },
  };
});
jest.mock('@src/infrastructure/services/OpenApiService/OpenApiService', () => {
  return {
    OpenApiService: {
      initialize: jest.fn(),
    },
  };
});
jest.mock('express', () => ({
  __esModule: true,
  json: jest.fn(),
  default: jest.fn(() => ({
    use: jest.fn(),
    listen: jest.fn(),
  })),
}));

describe('Server class', () => {
  const server = new Server();

  describe('constructor', () => {
    describe('WHEN instantiated', () => {
      it('should create an express server', () => {
        expect(express).toHaveBeenCalled();
      });

      it('should create a MainRouter', () => {
        expect(MainRouter).toHaveBeenCalled();
      });

      it('should add middleware to the express server', () => {
        const expressUseSpy = jest.spyOn(server.app, 'use');

        expect(expressUseSpy).toHaveBeenCalled();
      });

      it('should initialize the services', () => {
        const openApiServiceSpy = jest.spyOn(OpenApiService, 'initialize');
        const ImageServiceSpy = jest.spyOn(OpenApiService, 'initialize');

        expect(openApiServiceSpy).toHaveBeenCalledWith(server.app);
        expect(ImageServiceSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('start()', () => {
    describe('WHEN called', () => {
      it('should start the server', () => {
        const mockPort = 4242;
        const mockCallback = () => {
          return;
        };
        const listenSpy = jest.spyOn(server.app, 'listen');

        server.start(mockPort, mockCallback);

        expect(listenSpy).toHaveBeenCalledWith(mockPort, mockCallback);
      });
    });
  });
});
