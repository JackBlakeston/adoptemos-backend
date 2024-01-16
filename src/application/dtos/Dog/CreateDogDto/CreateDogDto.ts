import { IsBase64, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

import { BaseDto } from '@src/application/dtos/BaseDto';

export class CreateDogDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  breed?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  age?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsBase64()
  imageData?: string;

  constructor(data: CreateDogDto) {
    super(data);
  }
}
