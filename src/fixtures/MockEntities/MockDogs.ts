import { Dog } from '@src/core/domain/entities/Dog/Dog';

import { CreateDogDto } from '@src/application/dtos/Dog/CreateDogDto/CreateDogDto';

export const mockCreateDogDto: CreateDogDto = { name: 'Bob', breed: 'Mongrel' };
export const mockDogWithoutId = mockCreateDogDto as Dog;
export const mockDog: Dog = { ...mockCreateDogDto, id: 'yi-12-42-23-2', url: 'Bob_12asd_dsa' };
