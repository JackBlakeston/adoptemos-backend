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
    interface MockUploadImagesArgs {
      image?: string;
      otherImage?: string;
      name?: string;
      imageNameSuffix?: string;
      otherImageNameSuffix?: string;
    }
    const mockUploadImages = async ({
      image,
      otherImage,
      name,
      imageNameSuffix,
      otherImageNameSuffix,
    }: MockUploadImagesArgs) => {
      return await mockUseCase.uploadImagesAndGetConstructorData({
        folderName: mockFolderName,
        fileName: name,
        dto: { name, image, otherImage },
        images: [
          { urlPropName: 'imageUrl', dataPropName: 'image', nameSuffix: imageNameSuffix },
          { urlPropName: 'otherImageUrl', dataPropName: 'otherImage', nameSuffix: otherImageNameSuffix },
        ],
      });
    };

    describe('WHEN called with image data props', () => {
      it('should upload images', async () => {
        await mockUploadImages({ image: mockImageData, otherImage: mockOtherImageData, name: mockName });

        expect(uploadImageSpy.mock.calls[0][0].includes(mockFolderName)).toBe(true);
        expect(uploadImageSpy.mock.calls[0][1].includes(mockName)).toBe(true);
        expect(uploadImageSpy.mock.calls[0][2]).toEqual(mockImageData);
        expect(uploadImageSpy.mock.calls[1][0].includes(mockFolderName)).toBe(true);
        expect(uploadImageSpy.mock.calls[1][1].includes(mockName)).toBe(true);
        expect(uploadImageSpy.mock.calls[1][2]).toEqual(mockOtherImageData);
      });

      it('should return an object with the defined imageUrl props', async () => {
        const result = await mockUploadImages({ image: mockImageData, otherImage: mockOtherImageData, name: mockName });

        expect(result.imageUrl).toEqual(mockImageUrl);
        expect(result.otherImageUrl).toEqual(mockImageUrl);
      });
    });

    describe('WHEN called with no image data', () => {
      it('should return the same object', async () => {
        const result = await mockUploadImages({ name: mockName });

        expect(result.imageUrl).toBe(undefined);
        expect(result.otherImageUrl).toBe(undefined);
        expect(result).toEqual({
          name: mockName,
        });
      });
    });

    describe('WHEN called with no name', () => {
      it('should upload the images without a name', async () => {
        await mockUploadImages({ image: mockImageData, otherImage: mockOtherImageData });

        expect(uploadImageSpy.mock.calls[0][1].includes(mockName)).toBe(false);
        expect(uploadImageSpy.mock.calls[1][1].includes(mockName)).toBe(false);
      });
    });

    describe('WHEN called with name suffixes', () => {
      it('should upload the images the correct suffix', async () => {
        const mockImageNameSuffix = 'foo';
        const mockOtherImageNameSuffix = 'bar';
        await mockUploadImages({
          image: mockImageData,
          otherImage: mockOtherImageData,
          name: mockName,
          imageNameSuffix: mockImageNameSuffix,
          otherImageNameSuffix: mockOtherImageNameSuffix,
        });

        expect(uploadImageSpy.mock.calls[0][1].includes(mockImageNameSuffix)).toBe(true);
        expect(uploadImageSpy.mock.calls[1][1].includes(mockOtherImageNameSuffix)).toBe(true);
      });
    });
  });
});
