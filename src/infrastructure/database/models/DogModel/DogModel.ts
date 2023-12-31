import { SchemaDefinition } from 'mongoose';

import { Dog } from '@src/core/domain/entities/Dog/Dog';

import { BaseModel } from '@src/infrastructure/database/models/BaseModel';

const schemaDefinition: SchemaDefinition = {
  name: { type: String, required: true },
  breed: { type: String },
};

export const DogModel = new BaseModel<Dog>({
  name: 'Dog',
  schemaDefinition,
  hasUrl: true,
}).Model;
