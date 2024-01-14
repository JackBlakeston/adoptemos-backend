/* eslint-disable @typescript-eslint/no-explicit-any */
import { DogModel } from '@src/infrastructure/database/models/DogModel/DogModel';
import { dogSeed } from '@src/infrastructure/database/seeds/DogSeed/DogSeed';
import { SeedAndModel } from '@src/infrastructure/database/seeds/seedDb';

export const SEED_LIST: SeedAndModel<any>[] = [{ model: DogModel, seed: dogSeed }];
