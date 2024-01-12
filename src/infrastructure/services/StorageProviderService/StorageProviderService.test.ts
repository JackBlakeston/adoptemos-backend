import admin from 'firebase-admin';

import { StorageProviderService } from '@src/infrastructure/services/StorageProviderService/StorageProviderService';

jest.mock('firebase-admin', () => ({
  initializeApp: jest.fn(),
  credential: { cert: jest.fn() },
}));

describe('StorageProviderService', () => {
  describe('initialize()', () => {
    describe('WHEN called', () => {
      it('should initialize the storage provider service', () => {
        const initializeAppSpy = jest.spyOn(admin, 'initializeApp');
        const certSpy = jest.spyOn(admin.credential, 'cert');

        StorageProviderService.initialize();

        expect(initializeAppSpy).toHaveBeenCalledTimes(1);
        expect(certSpy).toHaveBeenCalledTimes(1);
        expect(certSpy).toHaveBeenCalledWith('./secrets/FirebaseServiceAccountKey.json');
      });
    });
  });
});
