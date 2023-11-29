import { DogController } from './DogController';
import { DogModel } from '../../../infrastructure/database/models/DogModel';
import {
  getErrorResponseObject,
  getMockRequest,
  getMockResponse,
  getSuccessResponseObject,
} from '../utils/testing/ControllerTestingUtils';
import { Request, Response } from 'express';
import { NotFoundError } from 'src/errors/NotFoundError/NotFoundError';
import { DogUseCases } from 'src/core/domain/useCases/DogUseCases/DogUseCases';
import { mockCreateDogDto, mockDogWithoutId } from 'src/fixtures/MockEntities/MockDogs';

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
    const createDogUseCaseSpy = jest.spyOn(DogUseCases.prototype, 'createDog');

    describe('WHEN dog creation is successful', () => {
      it('should send a response with a dog object and status 201', async () => {
        mockReq = getMockRequest(mockCreateDogDto);
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
        mockReq = getMockRequest(mockCreateDogDto);
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

    describe('WHEN successful in getting all dogs', () => {
      it('should send a response with a dog collection and status 200', async () => {
        const mockDogCollection = Array(2).fill(mockCreateDogDto);
        mockReq = getMockRequest();
        getAllDogsUseCaseSpy.mockImplementation(async () => {
          return mockDogCollection;
        });
        const expectedStatusCode = 200;

        await dogController.getAllDogs(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(mockRes.send).toHaveBeenCalledWith(getSuccessResponseObject(mockDogCollection));
      });
    });

    describe('WHEN dog creation is not successful', () => {
      it('should send a response with an error object and an error status', async () => {
        mockReq = getMockRequest();
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
