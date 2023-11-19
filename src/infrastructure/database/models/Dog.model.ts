import mongoose, { Schema } from 'mongoose';
import { Dog } from 'src/core/domain/entities/Dog';

const dogSchema = new Schema<Dog>({
  id: { type: mongoose.Schema.Types.Mixed, default: mongoose.Types.ObjectId },
  name: { type: String, required: true },
  breed: { type: String, required: true },
});

export const DogModel = mongoose.model<Dog>('Dog', dogSchema);
