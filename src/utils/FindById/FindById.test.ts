import { findById } from '@src/utils/FindById/FindById';

describe('findById()', () => {
  const mockItems = new Array(10).fill(null).map((_, index) => {
    return { id: index.toString() };
  });

  describe('WHEN invoked and a match is found', () => {
    it('should return the match', () => {
      const mockId = '2';

      const result = findById(mockId, mockItems);

      expect(result).toEqual({ id: mockId });
    });
  });

  describe('WHEN invoked and a match is not found', () => {
    it('should return undefined', () => {
      const mockId = '42';

      const result = findById(mockId, mockItems);

      expect(result).toBeUndefined();
    });
  });
});
