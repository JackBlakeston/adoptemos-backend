import { SeedAndModel } from '@src/infrastructure/database/seeds/seedList';

export const seedTestDb =
  <T>(seedsAndModels?: SeedAndModel<T>[]) =>
  async () => {
    if (seedsAndModels) {
      await Promise.all(
        seedsAndModels.map(async ({ seed, model }) => {
          await model.deleteMany();
          await model.insertMany(seed);
        }),
      );
    }
  };
