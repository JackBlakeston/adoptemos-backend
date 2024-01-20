/* eslint-disable no-console */
import mongoose from 'mongoose';

import { SEED_LIST, SeedAndModel } from '@src/infrastructure/database/seeds/seedList';

import { DB_URL } from '@src/config/databaseUrl';

export const seedDb = async <T>(seedsAndModels: SeedAndModel<T>[]) => {
  try {
    await mongoose.connect(DB_URL);
    console.log('Connected to mongodb, beginning to seed database...');

    await Promise.all(
      seedsAndModels.map(async ({ seed, model }) => {
        await model.deleteMany();
        await model.insertMany(seed);
      }),
    );

    await mongoose.connection.close();

    console.log('Data seeded successfully to db');
  } catch (error) {
    console.error('Error while seeding database: ');
  }
};

seedDb(SEED_LIST);
