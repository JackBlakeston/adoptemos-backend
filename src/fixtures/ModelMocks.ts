import { Schema, model } from 'mongoose';
import { MockEntity } from './ClassMocks';

export const MockModel = model<MockEntity>('MockModel', new Schema<MockEntity>({ requiredField: { type: String } }));
