import { BaseModel } from '@src/infrastructure/database/models/BaseModel';

import { MockEntity } from '@src/tests/fixtures/MockBaseClasses';

export const MockModel = new BaseModel<MockEntity>({
  name: 'MockModel',
  schemaDefinition: { requiredField: { type: String } },
}).Model;
