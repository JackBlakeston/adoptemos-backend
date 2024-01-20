import { MockRepositoryImpl } from '@src/tests/fixtures/MockBaseClasses';
import { MockModel } from '@src/tests/fixtures/MockModel';

describe('BaseRepositoryImpl', () => {
  describe('extended to create a repository class', () => {
    describe('WHEN instantiating the extended repository class', () => {
      it('should set the model prop', () => {
        const mockRepository = new MockRepositoryImpl(MockModel);

        expect(mockRepository).toHaveProperty('model', MockModel);
      });
    });
  });
});
