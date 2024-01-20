import { IsNotEmpty, IsString } from 'class-validator';

import { BaseEntity, EntityConstructorData } from '@src/core/domain/entities/BaseEntity';
import { BaseUseCase } from '@src/core/domain/useCases/BaseUseCase';

import { BaseController } from '@src/application/controllers/BaseController';
import { BaseDto } from '@src/application/dtos/BaseDto';

import { BaseRepositoryImpl } from '@src/infrastructure/repositories/BaseRepositoryImpl';

export class MockEntity extends BaseEntity {
  requiredField!: string;
  optionalField?: string;

  constructor(data: EntityConstructorData<MockEntity>) {
    super(data);
  }
}

export class MockRepositoryImpl extends BaseRepositoryImpl<MockEntity> {}

export class MockUseCase extends BaseUseCase<MockEntity, MockRepositoryImpl> {}

export class MockController extends BaseController<MockEntity, MockRepositoryImpl> {}

export class MockDto extends BaseDto {
  @IsString()
  @IsNotEmpty()
  requiredField!: string;

  constructor(data: MockDto) {
    super(data);
  }
}
