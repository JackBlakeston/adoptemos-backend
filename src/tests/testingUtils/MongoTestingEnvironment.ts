import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { Database } from '@src/infrastructure/database/Database';
import { SeedAndModel } from '@src/infrastructure/database/seeds/seedList';

export const useMongoTestingEnvironment = <T>(seedsAndModels?: SeedAndModel<T>[]) => {
  let mongoServer: MongoMemoryServer;

  const seedDb = async () => {
    if (seedsAndModels) {
      await Promise.all(
        seedsAndModels.map(async ({ seed, model }) => {
          await model.deleteMany();
          await model.insertMany(seed);
        }),
      );
    }
  };

  const createAndConnectToServer = async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await new Database(mongoUri).connect();
  };

  const tearDownServer = async () => {
    await mongoose.disconnect();
    await mongoServer?.stop();
  };

  const dropAllCollectionsInDb = async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
      const collection = mongoose.connection.collections[collectionName];
      await collection.deleteMany({});
    }
  };

  beforeAll(createAndConnectToServer);

  afterAll(tearDownServer);

  beforeEach(seedDb);

  afterEach(dropAllCollectionsInDb);
};
