/* eslint-disable no-use-before-define */
import { randomUUID, UUID } from 'crypto';

import { generateUrlSlug, UrlSlug } from '@src/core/domain/entities/utils/UrlSlugGenerator/UrlSlugGenerator';

export type EntityConstructorData<T extends BaseEntity> = Omit<T, 'id' | 'url'>;
export class BaseEntity {
  constructor(data: EntityConstructorData<BaseEntity>) {
    Object.assign(this, data);
  }
}

export class BaseEntityWithId extends BaseEntity {
  id: UUID;

  constructor(data: EntityConstructorData<BaseEntity>) {
    super(data);
    this.id = randomUUID();
  }
}

type BaseEntityWithUrlConstructorData = EntityConstructorData<BaseEntity> & { name?: string };
export class BaseEntityWithUrl extends BaseEntityWithId {
  url: UrlSlug;

  constructor(data: BaseEntityWithUrlConstructorData) {
    super(data);
    this.url = generateUrlSlug(data?.name);
  }
}
