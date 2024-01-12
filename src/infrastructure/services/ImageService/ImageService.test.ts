import { ImageService } from '@src/infrastructure/services/ImageService/ImageService';

const mockUrl = 'mock-url';
const getSignedUrlSpy = jest.fn(async () => [mockUrl]);
const onSpy = jest.fn(async (event, callback) => {
  if (event === 'error') {
    return;
  }
  await callback();
});
const createWriteStreamSpy = jest.fn(() => ({
  on: onSpy,
  emit: jest.fn(),
  removeListener: jest.fn(),
  listenerCount: jest.fn(),
  once: jest.fn(),
  write: jest.fn(),
  end: jest.fn(),
}));

jest.mock('firebase-admin', () => ({
  __esModule: true,
  default: {
    storage: () => ({
      bucket: () => ({
        file: () => ({
          createWriteStream: createWriteStreamSpy,
          getSignedUrl: getSignedUrlSpy,
        }),
      }),
    }),
  },
}));

describe('ImageService', () => {
  describe('uploadImage()', () => {
    describe('WHEN called', () => {
      const mockFolderPath = 'foo';
      const mockFileName = 'bar';

      it('should upload an image to the bucket', async () => {
        await ImageService.uploadImage(mockFolderPath, mockFileName, 'ADAAAAADDDDDDAAA');

        expect(createWriteStreamSpy).toHaveBeenCalledTimes(1);
        expect(getSignedUrlSpy).toHaveBeenCalledTimes(1);
        expect(getSignedUrlSpy).toHaveBeenCalledWith({ action: 'read', expires: '01-01-2500' });
      });

      it('should return the image url', async () => {
        const result = await ImageService.uploadImage(mockFolderPath, mockFileName, 'ADAAAAADDDDDDAAA');

        expect(result).toEqual(mockUrl);
      });
    });
  });
});
