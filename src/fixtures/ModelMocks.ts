import { model,Schema } from 'mongoose';

import { MockEntity } from '@src/fixtures/ClassMocks';

export const MockModel = model<MockEntity>('MockModel', new Schema<MockEntity>({ requiredField: { type: String } }));
