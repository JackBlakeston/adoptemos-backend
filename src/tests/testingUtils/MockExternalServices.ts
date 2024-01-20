jest.mock('@src/infrastructure/services/StorageProviderService/StorageProviderService', () => {
  return {
    StorageProviderService: {
      initialize: jest.fn(),
    },
  };
});
jest.mock('@src/infrastructure/services/OpenApiService/OpenApiService', () => {
  return {
    OpenApiService: {
      initialize: jest.fn(),
    },
  };
});
jest.mock('@src/infrastructure/services/ImageService/ImageService', () => {
  return {
    ImageService: {
      uploadImage: jest.fn(() => {
        return 'mock-url';
      }),
    },
  };
});
