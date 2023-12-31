import { randomUUID,UUID } from 'crypto';

import { BaseEntityWithUrlConstructorData, EntityConstructorData } from '@src/core/domain/entities/Entities.types';
import { generateUrlSlug,UrlSlug } from '@src/core/domain/entities/utils/UrlSlugGenerator/UrlSlugGenerator';

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

export class BaseEntityWithUrl extends BaseEntityWithId {
  url: UrlSlug;

  constructor(data: BaseEntityWithUrlConstructorData) {
    super(data);
    this.url = generateUrlSlug(this.id, data?.name);
  }
}
