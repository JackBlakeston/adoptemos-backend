/* eslint-disable no-console */
import mongoose from 'mongoose';

import { Database } from '@src/infrastructure/database/Database';
import { SeedAndModel } from '@src/infrastructure/database/seeds/seedList';
import { Server } from '@src/infrastructure/server/Server';

import { seedTestDb } from '@src/tests/testingUtils/TestDatabase';

const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_HOST, MONGODB_PORT, IS_DOCKER } = process.env;

const TEST_DB_DEV_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@localhost:${MONGODB_PORT}/test-db?authSource=admin`;
const TEST_DB_CI_URL = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/test-db?authSource=admin`;
export const TEST_DB_URL = IS_DOCKER === 'true' ? TEST_DB_CI_URL : TEST_DB_DEV_URL;

export const TEST_API_PORT = 8030;
export const TEST_API_URL = `http://localhost:${TEST_API_PORT}`;

export const useEndToEndEnvironment = <T>(seedsAndModels?: SeedAndModel<T>[]) => {
  let testHttpServer: AnyObj;

  const startApp = async () => {
    await new Database(TEST_DB_URL).connect();

    testHttpServer = new Server().start(TEST_API_PORT, () => {
      console.log(`Test server is running on port ${TEST_API_PORT}`);
    });
  };

  const stopApp = async () => {
    testHttpServer.close();
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  };

  beforeAll(startApp);

  afterAll(stopApp);

  beforeEach(seedTestDb(seedsAndModels));
};
