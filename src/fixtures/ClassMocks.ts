import { IsNotEmpty, IsString } from 'class-validator';
import { BaseController } from 'src/application/controllers/BaseController';
import { BaseDTO } from 'src/application/dtos/baseDTO/BaseDTO';
import { BaseEntity } from 'src/core/domain/entities/BaseEntity';
import { BaseUseCase } from 'src/core/domain/useCases/BaseUseCase';
import { BaseRepositoryImpl } from 'src/infrastructure/repositories/baseRepositoryImpl/BaseRepositoryImpl';

export class MockEntity extends BaseEntity {
  requiredField!: string;

  constructor(data: MockEntity) {
    super(data);
  }
}

export class MockRepositoryImpl extends BaseRepositoryImpl<MockEntity> {}

export class MockUseCase extends BaseUseCase<MockEntity, MockRepositoryImpl> {}

export class MockController extends BaseController<MockEntity, MockRepositoryImpl> {}

export class MockDTO extends BaseDTO {
  @IsString()
  @IsNotEmpty()
  requiredField!: string;

  constructor(data: MockDTO) {
    super(data);
  }
}
