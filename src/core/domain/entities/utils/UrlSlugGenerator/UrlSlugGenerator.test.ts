import { randomUUID } from 'crypto';
import { generateUrlSlug } from './UrlSlugGenerator';

describe('UrlSlugGenerator', () => {
  describe('generateUrlSlug', () => {
    describe('WHEN called', () => {
      it('should generate the slug for a url', () => {
        const mockPrefix = 'yi';

        const result = generateUrlSlug(randomUUID(), mockPrefix);
        const resultParts = result.split('_');

        expect(resultParts).toHaveLength(3);
        expect(resultParts[0]).toBe(mockPrefix);
        expect(resultParts[1]).toHaveLength(8);
        expect(resultParts[2]).toHaveLength(5);
      });
    });

    describe('WHEN called without a prefix', () => {
      it('should generate slugs without a prefix', () => {
        const result = generateUrlSlug(randomUUID());
        const resultParts = result.split('_');

        expect(resultParts).toHaveLength(2);
      });
    });
  });
});
