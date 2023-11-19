import { IsString, IsNotEmpty } from 'class-validator';
import { BaseDTO } from './baseDTO/BaseDTO';

export class CreateDogDTO extends BaseDTO {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  breed?: string;

  constructor(data: CreateDogDTO) {
    super(data);
  }
}
