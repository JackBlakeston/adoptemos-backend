import { BaseEntity } from './BaseEntity';

export type EntityConstructorData<T extends BaseEntity> = Omit<T, 'id' | 'url'>;

export type BaseEntityWithUrlConstructorData = EntityConstructorData<BaseEntity> & { name?: string };
