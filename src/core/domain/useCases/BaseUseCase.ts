import { BaseRepositoryImpl } from 'src/infrastructure/repositories/baseRepositoryImpl/BaseRepositoryImpl';
import { BaseEntity } from 'src/core/domain/entities/BaseEntity';

export class BaseUseCase<K extends BaseEntity, T extends BaseRepositoryImpl<K>> {
  protected repository: T;

  constructor(repository: T) {
    this.repository = repository;
  }
}
