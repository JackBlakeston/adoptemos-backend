export class BaseEntity {
  constructor(data: BaseEntity) {
    Object.assign(this, data);
  }
}
