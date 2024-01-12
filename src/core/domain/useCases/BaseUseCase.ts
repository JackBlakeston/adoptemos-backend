import { BaseEntity, EntityConstructorData } from '@src/core/domain/entities/BaseEntity';
import { generateUrlSlug } from '@src/core/domain/entities/utils/UrlSlugGenerator/UrlSlugGenerator';

import { BaseDto } from '@src/application/dtos/BaseDto';

import { BaseRepositoryImpl } from '@src/infrastructure/repositories/BaseRepositoryImpl';
import { ImageService } from '@src/infrastructure/services/ImageService/ImageService';

import { omitProps } from '@src/utils/OmitProps/OmitProps';

const { ENVIRONMENT } = process.env;

export interface DtoWithName extends BaseDto {}

interface UploadImagesAndAddUrlsToDtoArgs<Entity extends BaseEntity, Dto extends DtoWithName> {
  images: { urlPropName: keyof Entity; dataPropName: keyof Dto; nameSuffix?: string }[];
  folderName: string;
  fileName?: string;
  dto: Dto;
}

export abstract class BaseUseCase<K extends BaseEntity, T extends BaseRepositoryImpl<K>> {
  protected repository: T;

  constructor(repository: T) {
    this.repository = repository;
  }

  uploadEncodedImage = async (folderName: string, imageData: string, name?: string): Promise<string> => {
    return await ImageService.uploadImage(`${ENVIRONMENT}/${folderName}`, generateUrlSlug(name), imageData);
  };

  private getImageFileName = (fileName: string, nameSuffix: string) => {
    return fileName + (fileName && nameSuffix ? '_' : '') + nameSuffix;
  };

  uploadImagesAndGetConstructorData = async <Entity extends BaseEntity, Dto extends DtoWithName>({
    images,
    folderName,
    fileName = '',
    dto,
  }: UploadImagesAndAddUrlsToDtoArgs<Entity, Dto>): Promise<EntityConstructorData<Entity>> => {
    const imageUrls: { [key in keyof Entity]?: string } = {};
    const imageDataPropNames: (keyof Dto)[] = [];
    await Promise.all(
      images.map(async ({ dataPropName, urlPropName, nameSuffix = '' }) => {
        imageDataPropNames.push(dataPropName);

        const data = dto[dataPropName];
        if (data) {
          const finalFileName = this.getImageFileName(fileName, nameSuffix);
          imageUrls[urlPropName] = await this.uploadEncodedImage(folderName, data.toString(), finalFileName);
        }
      }),
    );

    const entityConstructorDataWithoutUrls = omitProps(dto, imageDataPropNames) as EntityConstructorData<Entity>;
    return { ...entityConstructorDataWithoutUrls, ...imageUrls };
  };
}
