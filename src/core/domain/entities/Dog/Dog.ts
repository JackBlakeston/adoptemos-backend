import { BaseEntityWithUrl, EntityConstructorData } from '@src/core/domain/entities/BaseEntity';

export class Dog extends BaseEntityWithUrl {
  name!: string;
  breed?: string;
  age?: number;
  imageUrl?: string;

  constructor(data: EntityConstructorData<Dog>) {
    super(data);
  }
}

export type DogConstructorData = EntityConstructorData<Dog>;
