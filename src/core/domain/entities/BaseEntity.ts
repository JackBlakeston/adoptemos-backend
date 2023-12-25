import { UUID, randomUUID } from 'crypto';
import { UrlSlug, generateUrlSlug } from '@src/core/domain/entities/utils/UrlSlugGenerator/UrlSlugGenerator';
import { BaseEntityWithUrlConstructorData, EntityConstructorData } from '@src/core/domain/entities/Entities.types';

export class BaseEntity {
  id: UUID;

  constructor(data: EntityConstructorData<BaseEntity>) {
    Object.assign(this, data);
    this.id = randomUUID();
  }
}

export class BaseEntityWithUrl extends BaseEntity {
  url: UrlSlug;

  constructor(data: BaseEntityWithUrlConstructorData) {
    super(data);
    this.url = generateUrlSlug(this.id, data?.name);
  }
}
