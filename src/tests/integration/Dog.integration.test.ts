import '@src/tests/testingUtils/MockExternalServices';

import request from 'supertest';

import { Dog } from '@src/core/domain/entities/Dog/Dog';
import { DogUseCases } from '@src/core/domain/useCases/DogUseCases/DogUseCases';

import { DogModel } from '@src/infrastructure/database/models/DogModel/DogModel';
import { dogSeed } from '@src/infrastructure/database/seeds/DogSeed/DogSeed';
import { Server } from '@src/infrastructure/server/Server';

import { omitProps } from '@src/utils/OmitProps/OmitProps';

import { mockCreateDogDto } from '@src/tests/fixtures/MockEntities/MockDog';
import { getErrorResponseObject, getSuccessResponseObject } from '@src/tests/fixtures/MockResponse';
import { useMongoTestEnvironment } from '@src/tests/testEnvironment/UseMongoTestEnv';
import { spyAndMockError } from '@src/tests/testingUtils/ThrowError';

describe('Dog integration test', () => {
  useMongoTestEnvironment([{ model: DogModel, seed: dogSeed }]);

  const app = new Server().app;

  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('GET /dogs', () => {
    describe('WHEN receiving a request', () => {
      it('should retrieve a list of all dogs', async () => {
        const response = await request(app).get('/dogs');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(getSuccessResponseObject(dogSeed));
      });
    });

    describe('WHEN encountering an error', () => {
      it('should send the correct status code and error response', async () => {
        const mockErrorMessage = 'foo error';
        spyAndMockError(DogUseCases, 'getAllDogs', mockErrorMessage);

        const response = await request(app).get('/dogs');

        expect(response.status).toBe(500);
        expect(response.body).toEqual(getErrorResponseObject(mockErrorMessage));
      });
    });
  });

  describe('POST /dogs', () => {
    describe('WHEN receiving a request with a valid body', () => {
      it('should return the created dog', async () => {
        const response = await request(app).post('/dogs').send(mockCreateDogDto);
        const responseData = response.body.data;

        expect(response.status).toBe(201);
        expect(omitProps(responseData, ['id', 'url'])).toEqual(mockCreateDogDto);
      });

      it('should create the dog successfully', async () => {
        const createDogResponse = await request(app).post('/dogs').send(mockCreateDogDto);
        const createdDogId = createDogResponse.body.data.id;
        const getDogsResponse = await request(app).get('/dogs');
        const foundDog = getDogsResponse.body.data.find((dog: Dog) => dog.id === createdDogId);

        expect(omitProps(foundDog, ['id', 'url'])).toEqual(mockCreateDogDto);
      });
    });

    describe('WHEN receiving a request with an invalid body', () => {
      it('should send the correct status code and error response', async () => {
        const response = await request(app).post('/dogs');

        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          getErrorResponseObject('Errors in request body: name should not be empty, name must be a string'),
        );
      });
    });

    describe('WHEN encountering an error', () => {
      it('should send the correct status code and error response', async () => {
        const mockErrorMessage = 'foo error';
        spyAndMockError(DogUseCases, 'createDog', mockErrorMessage);

        const response = await request(app).post('/dogs').send(mockCreateDogDto);

        expect(response.status).toBe(500);
        expect(response.body).toEqual(getErrorResponseObject(mockErrorMessage));
      });
    });
  });
});
