import { Model, model, Schema, SchemaDefinition } from 'mongoose';

import { BaseEntity } from '@src/core/domain/entities/BaseEntity';

export interface BaseSchemaProps {
  schemaDefinition: SchemaDefinition;
  hasId?: boolean;
  hasUrl?: boolean;
}

export interface BaseModelProps extends BaseSchemaProps {
  name: string;
}

export class BaseModel<T extends BaseEntity> {
  Model: Model<T>;

  constructor({ name, ...schemaProps }: BaseModelProps) {
    const schema = this.getSchema(schemaProps);
    this.Model = model<T>(name, schema);
  }

  private getSchema({ schemaDefinition, hasId = true, hasUrl = false }: BaseSchemaProps) {
    const schemaOptions: SchemaDefinition = {};

    if (hasId) {
      schemaOptions.id = { type: String, required: true };
    }
    if (hasUrl) {
      schemaOptions.url = { type: String, required: true };
    }

    return new Schema<T>({
      ...schemaOptions,
      ...schemaDefinition,
    });
  }
}
