import { BaseModel } from '@src/infrastructure/database/models/BaseModel';

describe('BaseEntity', () => {
  describe('constructor', () => {
    describe('WHEN instantiated', () => {
      const mockName = 'Foo';
      const mockSchemaDefinition = { schemaProp: { type: String, required: true } };

      const TestModel = new BaseModel({
        name: mockName,
        schemaDefinition: mockSchemaDefinition,
      }).Model;

      it('creates a mongoose model with the correct name', () => {
        expect(TestModel.modelName).toEqual(mockName);
      });

      it('adds the correct schema to the model', () => {
        expect(Object.keys(TestModel.schema.paths)).toContain('schemaProp');
      });

      it('adds the id prop to the schema by default', () => {
        expect(Object.keys(TestModel.schema.paths)).toContain('id');
      });

      it('does not add the url prop to the schema by default', () => {
        expect(Object.keys(TestModel.schema.paths)).not.toContain('url');
      });
    });

    describe('WHEN instantiated with hasId = false', () => {
      const TestModel = new BaseModel({
        name: 'no-id-model',
        schemaDefinition: {},
        hasId: false,
      }).Model;

      it('does not add the id prop to the schema', () => {
        expect(Object.keys(TestModel.schema.paths)).not.toContain('id');
      });
    });

    describe('WHEN instantiated with hasUrl = true', () => {
      const TestModel = new BaseModel({
        name: 'url-model',
        schemaDefinition: {},
        hasUrl: true,
      }).Model;

      it('does not add the id prop to the schema', () => {
        expect(Object.keys(TestModel.schema.paths)).toContain('url');
      });
    });
  });
});
