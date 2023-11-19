import { BaseRepositoryImpl } from 'src/infrastructure/repositories/baseRepositoryImpl/BaseRepositoryImpl';

export class BaseController<K, T extends BaseRepositoryImpl<K>> {
  protected repository: T;

  constructor(repository: T) {
    this.repository = repository;
  }
}
