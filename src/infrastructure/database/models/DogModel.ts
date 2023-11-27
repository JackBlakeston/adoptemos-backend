import { Schema, Types, model } from 'mongoose';
import { Dog } from 'src/core/domain/entities/Dog/Dog';

const dogSchema = new Schema<Dog>({
  id: { type: Schema.Types.Mixed, default: Types.ObjectId },
  name: { type: String, required: true },
  breed: { type: String, required: true },
});

export const DogModel = model<Dog>('Dog', dogSchema);
