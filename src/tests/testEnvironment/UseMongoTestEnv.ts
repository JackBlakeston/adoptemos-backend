import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { Database } from '@src/infrastructure/database/Database';
import { SeedAndModel } from '@src/infrastructure/database/seeds/seedList';

import { seedTestDb } from '@src/tests/testingUtils/TestDatabase';

export const useMongoTestEnvironment = <T>(seedsAndModels?: SeedAndModel<T>[]) => {
  let mongoServer: MongoMemoryServer;

  const createAndConnectToServer = async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await new Database(mongoUri).connect();
  };

  const tearDownServer = async () => {
    await mongoose.disconnect();
    await mongoServer?.stop();
  };

  beforeAll(createAndConnectToServer);

  afterAll(tearDownServer);

  beforeEach(seedTestDb(seedsAndModels));
};
