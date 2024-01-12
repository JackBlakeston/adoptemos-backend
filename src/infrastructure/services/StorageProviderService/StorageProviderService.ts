import admin from 'firebase-admin';

export class StorageProviderService {
  static initialize = () => {
    const serviceAccountKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '{}');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey),
    });
  };
}
