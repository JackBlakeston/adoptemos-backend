import admin from 'firebase-admin';

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  credential: { cert: jest.fn() },
}));

describe('StorageProviderService', () => {
  const mockProviderKeyJson = '{"Foo": "bar"}';

  const getTestClass = async () => {
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY = mockProviderKeyJson;
    return await import('@src/infrastructure/services/StorageProviderService/StorageProviderService');
  };

  describe('initialize()', () => {
    describe('WHEN called', () => {
      const certSpy = jest.spyOn(admin.credential, 'cert');

      it('should initialize the storage provider service', async () => {
        const { StorageProviderService } = await getTestClass();
        const initializeAppSpy = jest.spyOn(admin, 'initializeApp');

        StorageProviderService.initialize();

        expect(initializeAppSpy).toHaveBeenCalledTimes(1);
        expect(certSpy).toHaveBeenCalledTimes(1);
      });

      it('should use the service key from .env', async () => {
        const { StorageProviderService } = await getTestClass();

        StorageProviderService.initialize();

        expect(certSpy).toHaveBeenCalledWith(JSON.parse(mockProviderKeyJson));
      });
    });
  });
});
