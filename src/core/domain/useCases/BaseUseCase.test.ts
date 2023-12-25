import { MockRepositoryImpl, MockUseCase } from '@src/fixtures/ClassMocks';
import { MockModel } from '@src/fixtures/ModelMocks';

describe('BaseUseCase', () => {
  describe('extended to create a use case class', () => {
    describe('WHEN instantiating the extended use case class', () => {
      it('should set the repository prop', () => {
        const mockRepository = new MockRepositoryImpl(MockModel);
        const mockUseCase = new MockUseCase(mockRepository);

        expect(mockUseCase).toHaveProperty('repository', mockRepository);
      });
    });
  });
});
