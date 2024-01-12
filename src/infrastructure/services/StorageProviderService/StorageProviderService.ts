import admin from 'firebase-admin';

import { FIREBASE_SERVICE_ACCOUNT_KEY_PATH } from '@src/infrastructure/services/StorageProviderService/StorageProviderService.const';

export class StorageProviderService {
  static initialize = () => {
    admin.initializeApp({
      credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT_KEY_PATH),
    });
  };
}
