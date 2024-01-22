import axios from 'axios';

import { DogModel } from '@src/infrastructure/database/models/DogModel/DogModel';
import { dogSeed } from '@src/infrastructure/database/seeds/DogSeed/DogSeed';

import { findById } from '@src/utils/FindById/FindById';
import { omitProps } from '@src/utils/OmitProps/OmitProps';

import { mockCreateDogDto } from '@src/tests/fixtures/MockEntities/MockDog';
import { getErrorResponseObject, getSuccessResponseObject } from '@src/tests/fixtures/MockResponse';
import { TEST_API_URL, useEndToEndEnvironment } from '@src/tests/testEnvironment/UseEndToEndEnv';
import { AXIOS_TEST_CONFIG } from '@src/tests/testingUtils/AxiosTestConfig';

describe('Dog end to end test', () => {
  const baseRoute = '/dogs';
  const baseUrl = `${TEST_API_URL}${baseRoute}`;

  useEndToEndEnvironment([{ model: DogModel, seed: dogSeed }]);

  describe('GET /dogs', () => {
    describe('WHEN receiving a request', () => {
      it('should retrieve a list of all dogs', async () => {
        const { data, status } = await axios.get(baseUrl, AXIOS_TEST_CONFIG);

        expect(status).toBe(200);
        expect(data).toEqual(getSuccessResponseObject(dogSeed));
      });
    });
  });

  describe('POST /dogs', () => {
    describe('WHEN receiving a request with a valid body', () => {
      it('should return the created dog', async () => {
        const { data, status } = await axios.post(baseUrl, mockCreateDogDto, AXIOS_TEST_CONFIG);
        const responseData = data.data;

        expect(status).toBe(201);
        expect(omitProps(responseData, ['id', 'url'])).toEqual(mockCreateDogDto);
      });

      it('should create the dog successfully', async () => {
        const { data: createdDogData } = await axios.post(baseUrl, mockCreateDogDto, AXIOS_TEST_CONFIG);
        const createdDogId = createdDogData.data.id;
        const { data: getDogsData } = await axios.get(baseUrl, AXIOS_TEST_CONFIG);
        const foundDog = findById(createdDogId, getDogsData.data);

        if (!foundDog) fail();
        expect(omitProps(foundDog, ['id', 'url'])).toEqual(mockCreateDogDto);
      });
    });

    describe('WHEN receiving a request with an invalid body', () => {
      it('should send the correct status code and error response', async () => {
        const { data, status } = await axios.post(baseUrl, {}, AXIOS_TEST_CONFIG);

        expect(status).toBe(400);
        expect(data).toEqual(
          getErrorResponseObject('Errors in request body: name should not be empty, name must be a string'),
        );
      });
    });
  });
});
