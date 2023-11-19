export class BaseDTO {
  constructor(data: BaseDTO) {
    Object.assign(this, data);
  }
}
