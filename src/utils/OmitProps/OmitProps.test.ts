import { omitProps } from '@src/utils/OmitProps/OmitProps';

describe('omitProps()', () => {
  const mockObject = {
    id: 1,
    name: 'John',
    age: 25,
    address: '123 Main St',
  };

  describe('WHEN invoked with an object and a keys array', () => {
    it('should omit specified keys from the object', () => {
      const result = omitProps(mockObject, ['id', 'address']);

      expect('id' in result).toBe(false);
      expect('address' in result).toBe(false);
      expect(result.name).toEqual(mockObject.name);
      expect(result.age).toEqual(mockObject.age);
    });
  });

  describe('WHEN invoked with an empty keys array', () => {
    it('should return the input object', () => {
      const result = omitProps(mockObject, []);

      expect(result).toEqual(mockObject);
    });
  });
});
