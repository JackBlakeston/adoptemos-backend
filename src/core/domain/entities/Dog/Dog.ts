import { BaseEntityWithUrl } from '../BaseEntity';
import { EntityConstructorData } from '../Entities.types';

export class Dog extends BaseEntityWithUrl {
  name!: string;
  breed?: string;

  constructor(data: EntityConstructorData<Dog>) {
    super(data);
  }
}

export type DogConstructorData = EntityConstructorData<Dog>;
