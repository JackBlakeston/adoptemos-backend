import { BaseEntity, EntityConstructorData } from '@src/core/domain/entities/BaseEntity';
import { generateUrlSlug } from '@src/core/domain/entities/utils/UrlSlugGenerator/UrlSlugGenerator';

import { BaseDto } from '@src/application/dtos/BaseDto';

import { BaseRepositoryImpl } from '@src/infrastructure/repositories/BaseRepositoryImpl';
import { ImageService } from '@src/infrastructure/services/ImageService/ImageService';

import { omitProps } from '@src/utils/OmitProps/OmitProps';

const { ENVIRONMENT } = process.env;

export interface DtoWithName extends BaseDto {
  name?: string;
}

interface UploadImagesAndAddUrlsToDtoArgs<Entity extends BaseEntity, Dto extends DtoWithName> {
  images: { urlPropName: keyof Entity; dataPropName: keyof Dto; nameSuffix?: string }[];
  folderName: string;
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

  uploadImagesAndGetConstructorData = async <Entity extends BaseEntity, Dto extends DtoWithName>({
    images,
    folderName,
    dto,
  }: UploadImagesAndAddUrlsToDtoArgs<Entity, Dto>): Promise<EntityConstructorData<Entity>> => {
    const imageUrls: { [key in keyof Entity]?: string } = {};
    const imageDataPropNames: (keyof Dto)[] = [];
    await Promise.all(
      images.map(async ({ dataPropName, urlPropName, nameSuffix }) => {
        const data = dto[dataPropName];

        if (data) {
          const fileName = dto?.name + (nameSuffix ? `_${nameSuffix}` : '');
          imageUrls[urlPropName] = await this.uploadEncodedImage(folderName, data.toString(), fileName);
          imageDataPropNames.push(dataPropName);
        }
      }),
    );

    const entityConstructorDataWithoutUrls = omitProps(dto, imageDataPropNames) as EntityConstructorData<Entity>;
    return { ...entityConstructorDataWithoutUrls, ...imageUrls };
  };
}
