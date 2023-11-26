import { BaseEntity } from '../BaseEntity';

export class Dog extends BaseEntity {
  id!: string;
  name!: string;
  breed?: string;

  constructor(data: Dog) {
    super(data);
  }
}
