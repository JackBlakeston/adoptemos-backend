import { BaseEntity } from '@src/core/domain/entities/BaseEntity';
import { Model, Schema, SchemaDefinition, model } from 'mongoose';

export interface BaseModelProps {
  name: string;
  schemaDefinition: SchemaDefinition;
  hasId?: boolean;
  hasUrl?: boolean;
}

export class BaseModel<T extends BaseEntity> {
  Model: Model<T>;

  constructor({ name, schemaDefinition, hasId = true, hasUrl = false }: BaseModelProps) {
    const schema = this.getSchema(schemaDefinition, hasId, hasUrl);
    this.Model = model<T>(name, schema);
  }

  private getSchema(schemaDefinition: SchemaDefinition, hasId: boolean, hasUrl: boolean) {
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
