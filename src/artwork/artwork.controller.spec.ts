import { Test, TestingModule } from '@nestjs/testing';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { IArtwork } from './artwork.interface';

describe('ArtworkController', () => {
  let controller: ArtworkController;
  let fakeArtworkService: Partial<ArtworkService>;
  let fakeUserService: Partial<UserService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeArtworkService = {
      listByUser: () => {
        return Promise.resolve([
          {
            id: 1,
            title: 'title',
            author: 'author',
          },
          {
            id: 2,
            title: 'title2',
            author: 'author2',
          },
        ]);
      },
    };
    fakeUserService = {};
    fakeAuthService = {};
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtworkController],
      providers: [
        {
          provide: ArtworkService,
          useValue: fakeArtworkService,
        },
        {
          provide: UserService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<ArtworkController>(ArtworkController);
  });

  it('listByUser should return array of artworks', async () => {
    const artworks:IArtwork[] = <IArtwork[]> await controller.listByUser('1');
    expect(Array.isArray(artworks)).toBe(true);
    expect(artworks.every((artwork) => typeof artwork === 'object')).toBe(true);

    artworks.forEach((artwork) => {
      expect(artwork).toHaveProperty('id');
      expect(artwork).toHaveProperty('title');
      expect(artwork).toHaveProperty('author');
    });
  });
});
