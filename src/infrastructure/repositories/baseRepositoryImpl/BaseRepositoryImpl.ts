import { Model } from 'mongoose';
import { BaseEntity } from 'src/core/domain/entities/baseEntity/BaseEntity';

export class BaseRepositoryImpl<T extends BaseEntity> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
}
