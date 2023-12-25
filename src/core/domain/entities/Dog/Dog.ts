import { BaseEntityWithUrl } from '@src/core/domain/entities/BaseEntity';
import { EntityConstructorData } from '@src/core/domain/entities/Entities.types';

export class Dog extends BaseEntityWithUrl {
  name!: string;
  breed?: string;

  constructor(data: EntityConstructorData<Dog>) {
    super(data);
  }
}

export type DogConstructorData = EntityConstructorData<Dog>;
