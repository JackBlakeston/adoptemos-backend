import { Bucket } from '@google-cloud/storage';
import admin from 'firebase-admin';
import { Readable } from 'stream';

export type ImageUrl = `https://firebasestorage.googleapis.com/${string}/${string}/${string}`;

export class ImageService {
  private static getWriteSteam = (bucket: Bucket, path: string) => {
    const file = bucket.file(path);
    const writeStream = file.createWriteStream({
      metadata: { contentType: 'image/jpeg' },
    });
    return writeStream;
  };

  private static getBufferStream = (base64Data: string) => {
    const buffer = Buffer.from(base64Data, 'base64');
    const bufferStream = new Readable();
    bufferStream.push(buffer);
    bufferStream.push(null);

    return bufferStream;
  };

  static uploadImage = async (folderPath: string, fileName: string, base64Data: string): Promise<string> => {
    const filePath = `${folderPath}/${fileName}.jpeg`;
    const bucket = admin.storage().bucket('gs://adoptemos-server.appspot.com');
    const file = bucket.file(filePath);
    const writeStream = this.getWriteSteam(bucket, filePath);
    const bufferStream = this.getBufferStream(base64Data);

    return new Promise((resolve, reject) => {
      bufferStream.pipe(writeStream);

      writeStream.on('finish', async () => {
        try {
          const [url] = await file.getSignedUrl({ action: 'read', expires: '01-01-2500' });
          resolve(url);
        } catch (error) {
          reject(error);
        }
      });
      writeStream.on('error', reject);
    });
  };
}
