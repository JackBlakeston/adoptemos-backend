import { Request, Response } from 'express';

import { DogUseCases } from '@src/core/domain/useCases/DogUseCases/DogUseCases';

import { DogController } from '@src/application/controllers/DogController/DogController';
import {
  getErrorResponseObject,
  getMockRequest,
  getMockResponse,
  getSuccessResponseObject,
} from '@src/application/controllers/utils/testing/ControllerTestingUtils';

import { DogModel } from '@src/infrastructure/database/models/DogModel/DogModel';

import { NotFoundError } from '@src/errors/NotFoundError/NotFoundError';

import { mockCreateDogDto, mockDogWithoutId } from '@src/fixtures/MockEntities/MockDog';

describe('DogController', () => {
  const mockErrorMessage = 'Test error message';

  let dogController: DogController;
  let mockReq: Request;
  let mockRes: Response;

  beforeEach(() => {
    jest.resetAllMocks();
    dogController = new DogController(DogModel);
    mockRes = getMockResponse();
  });

  describe('createDog method', () => {
    mockReq = getMockRequest({ mockBody: mockCreateDogDto });
    const createDogUseCaseSpy = jest.spyOn(DogUseCases.prototype, 'createDog');

    describe('WHEN dog creation is successful', () => {
      it('should send a response with a dog object and status 201', async () => {
        createDogUseCaseSpy.mockImplementation(async () => {
          return mockDogWithoutId;
        });
        const expectedStatusCode = 201;

        await dogController.createDog(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(mockRes.send).toHaveBeenCalledWith(getSuccessResponseObject(mockCreateDogDto));
      });
    });

    describe('WHEN dog creation is not successful', () => {
      it('should send a response with an error object and an error status', async () => {
        createDogUseCaseSpy.mockImplementation(async () => {
          throw new NotFoundError(mockErrorMessage);
        });
        const expectedStatusCode = 404;

        await dogController.createDog(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(mockRes.send).toHaveBeenCalledWith(getErrorResponseObject(mockErrorMessage));
      });
    });
  });

  describe('getAllDogs method', () => {
    const getAllDogsUseCaseSpy = jest.spyOn(DogUseCases.prototype, 'getAllDogs');
    mockReq = getMockRequest({});

    describe('WHEN getting all dogs successfully', () => {
      it('should send a response with a dog collection and status 200', async () => {
        const mockDogCollection = Array(2).fill(mockCreateDogDto);
        getAllDogsUseCaseSpy.mockImplementation(async () => {
          return mockDogCollection;
        });
        const expectedStatusCode = 200;

        await dogController.getAllDogs(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(mockRes.send).toHaveBeenCalledWith(getSuccessResponseObject(mockDogCollection));
      });
    });

    describe('WHEN failing to get all dogs', () => {
      it('should send a response with an error object and an error status', async () => {
        getAllDogsUseCaseSpy.mockImplementation(async () => {
          throw new NotFoundError(mockErrorMessage);
        });
        const expectedStatusCode = 404;

        await dogController.getAllDogs(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(mockRes.send).toHaveBeenCalledWith(getErrorResponseObject(mockErrorMessage));
      });
    });
  });
});
