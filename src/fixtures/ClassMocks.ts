import { IsNotEmpty, IsString } from 'class-validator';
import { BaseController } from '@src/application/controllers/BaseController';
import { BaseDto } from '@src/application/dtos/BaseDto';
import { BaseEntity } from '@src/core/domain/entities/BaseEntity';
import { EntityConstructorData } from '@src/core/domain/entities/Entities.types';
import { BaseUseCase } from '@src/core/domain/useCases/BaseUseCase';
import { BaseRepositoryImpl } from '@src/infrastructure/repositories/BaseRepositoryImpl';

export class MockEntity extends BaseEntity {
  requiredField!: string;

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
