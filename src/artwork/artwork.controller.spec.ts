import { Test, TestingModule } from '@nestjs/testing';
import { ArtworkController } from './artwork.controller';
import { IArtwork } from './artwork.interface';

describe('ArtworkController', () => {
  let controller: ArtworkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtworkController],
    }).compile();

    controller = module.get<ArtworkController>(ArtworkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('listByUser should return array of artworks', async () => {
    const artworks: IArtwork[] = await controller.listByUser("1");
    expect(artworks).toBeDefined();
  });
});
