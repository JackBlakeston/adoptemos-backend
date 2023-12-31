import { IsNotEmpty, IsOptional,IsString } from 'class-validator';

import { BaseDto } from '@src/application/dtos/BaseDto';

export class CreateDogDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  breed?: string;

  constructor(data: CreateDogDto) {
    super(data);
  }
}
