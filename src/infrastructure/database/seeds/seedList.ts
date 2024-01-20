/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model } from 'mongoose';

import { DogModel } from '@src/infrastructure/database/models/DogModel/DogModel';
import { dogSeed } from '@src/infrastructure/database/seeds/DogSeed/DogSeed';

export interface SeedAndModel<T> {
  model: Model<T>;
  seed: AnyObj[];
}

export const SEED_LIST: SeedAndModel<any>[] = [{ model: DogModel, seed: dogSeed }];
