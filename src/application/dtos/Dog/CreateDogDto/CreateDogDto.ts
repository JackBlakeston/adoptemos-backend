import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { BaseDto } from '../../BaseDto';

export class CreateDogDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  breed?: string;

  constructor(data: CreateDogDto) {
    super(data);
  }
}
