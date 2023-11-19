import { Model } from 'mongoose';

export class BaseRepositoryImpl<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
}
