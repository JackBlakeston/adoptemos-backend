import { Schema, model } from 'mongoose';
import { Dog } from 'src/core/domain/entities/Dog/Dog';

const dogSchema = new Schema<Dog>({
  id: { type: String, required: true },
  url: { type: String, required: true },
  name: { type: String, required: true },
  breed: { type: String },
});

export const DogModel = model<Dog>('Dog', dogSchema);
