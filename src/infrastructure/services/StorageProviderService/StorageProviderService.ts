import admin from 'firebase-admin';

export class StorageProviderService {
  static initialize = () => {
    admin.initializeApp({
      credential: admin.credential.cert('./secrets/FirebaseServiceAccountKey.json'),
    });
  };
}
