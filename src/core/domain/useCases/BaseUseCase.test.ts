import { ImageService } from '@src/infrastructure/services/ImageService/ImageService';

import { MockRepositoryImpl, MockUseCase } from '@src/fixtures/ClassMocks';
import { MockModel } from '@src/fixtures/ModelMocks';

jest.mock('@src/infrastructure/services/ImageService/ImageService', () => {
  return {
    ImageService: {
      uploadImage: jest.fn(() => {
        return 'mock-url';
      }),
    },
  };
});
const uploadImageSpy = ImageService.uploadImage as jest.Mock;

describe('BaseUseCase', () => {
  const mockRepository = new MockRepositoryImpl(MockModel);
  const mockUseCase = new MockUseCase(mockRepository);
  const mockImageUrl = 'mock-url';
  const mockImageData = 'base64ImageData';
  const mockOtherImageData = 'otherBase64ImageData';
  const mockFolderName = 'dogs';
  const mockName = 'Bob';

  beforeEach(() => {
    uploadImageSpy.mockClear();
  });

  describe('extended to create a use case class', () => {
    describe('WHEN instantiating the extended use case class', () => {
      it('should set the repository prop', () => {
        expect(mockUseCase).toHaveProperty('repository', mockRepository);
      });
    });
  });

  describe('uploadEncodedImage()', () => {
    describe('WHEN called', () => {
      it('should call the image service with the correct args', async () => {
        await mockUseCase.uploadEncodedImage(mockFolderName, mockImageData, mockName);

        expect(uploadImageSpy.mock.calls[0][0].includes(mockFolderName)).toBe(true);
        expect(uploadImageSpy.mock.calls[0][1].includes(mockName)).toBe(true);
        expect(uploadImageSpy.mock.calls[0][2]).toEqual(mockImageData);
      });

      it('should return the imageUrl', async () => {
        const result = await mockUseCase.uploadEncodedImage(mockFolderName, mockImageData, mockName);

        expect(result).toEqual(mockImageUrl);
      });
    });
  });

  describe('uploadImagesAndGetConstructorData()', () => {
    const mockUploadImages = async (image?: string, otherImage?: string) => {
      return await mockUseCase.uploadImagesAndGetConstructorData({
        folderName: mockFolderName,
        dto: { name: mockName, image, otherImage },
        images: [
          { urlPropName: 'imageUrl', dataPropName: 'image' },
          { urlPropName: 'otherImageUrl', dataPropName: 'otherImage' },
        ],
      });
    };

    describe('WHEN called with image data props', () => {
      it('should upload images', async () => {
        await mockUploadImages(mockImageData, mockOtherImageData);

        expect(uploadImageSpy.mock.calls[0][0].includes(mockFolderName)).toBe(true);
        expect(uploadImageSpy.mock.calls[0][1].includes(mockName)).toBe(true);
        expect(uploadImageSpy.mock.calls[0][2]).toEqual(mockImageData);
        expect(uploadImageSpy.mock.calls[1][0].includes(mockFolderName)).toBe(true);
        expect(uploadImageSpy.mock.calls[1][1].includes(mockName)).toBe(true);
        expect(uploadImageSpy.mock.calls[1][2]).toEqual(mockOtherImageData);
      });

      it('should return an object with the defined imageUrl props', async () => {
        const result = await mockUploadImages(mockImageData, mockOtherImageData);

        expect(result.imageUrl).toEqual(mockImageUrl);
        expect(result.otherImageUrl).toEqual(mockImageUrl);
      });

      it('should return the same object if no data is found', async () => {
        const result = await mockUploadImages();

        expect(result.imageUrl).toBe(undefined);
        expect(result.otherImageUrl).toBe(undefined);
        expect(result).toEqual({
          name: mockName,
        });
      });
    });
  });
});
