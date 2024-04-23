import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Artwork } from './artwork.entity';
import { IArtwork } from './artwork.interface';
import { IUser } from '../user/user.interface';
import { UserService } from '../user/user.service';

@Injectable()
export class ArtworkService {
  private apiUrl: string = 'https://api.artic.edu/api/v1/artworks/';
  private apiParams = new URLSearchParams({
    fields: 'id,title,artist_title,thumbnail',
  });

  constructor(@InjectRepository(Artwork) private repo: Repository<IArtwork>, private userService: UserService) {}

  async listByUser(id: number): Promise<IArtwork[]> {

    const user: IUser = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.findBy({ user: user });
  }

  async fetchArtwork(artworkId: number): Promise<IArtwork> {
    try {
      const response = await fetch(
        `${this.apiUrl}${artworkId}?${this.apiParams}`,
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch artwork (status ${response.status})`);
      }

      const artworkData = await response.json();
      const { id, title, artist_title, thumbnail } = artworkData.data;
      const thumbnailUrl = thumbnail ? thumbnail.lqip : null;

      return { id, title, author: artist_title, thumbnail: thumbnailUrl };
    } catch (error) {
      console.error('Error fetching artwork:', error.message);
      return null;
    }
  }

  async fetchAllArtworks(pageNumber: number, pageSize: number): Promise<IArtwork[]> {
    try {
      const params = new URLSearchParams({
        page: pageNumber.toString(),
        limit: pageSize.toString(),
      });
      const response = await fetch(`${this.apiUrl}?${params}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch artworks (status ${response.status})`);
      }

      const artworksData = await response.json();
      const artworks = artworksData.data;
      const allArtworks = [];

      artworks.forEach((artwork) => {
        const { id, title, artist_title, thumbnail } = artwork;
        const thumbnailUrl = thumbnail ? thumbnail.lqip : null;
        allArtworks.push({ id, title, artist: artist_title, thumbnailUrl });
      });

      return allArtworks;
    } catch (error) {
      console.error('Error fetching artworks:', error.message);
      return [];
    }
  }

  async buyingArtwork(artwork: IArtwork, user: IUser): Promise<IArtwork> {
    artwork.user = user;

    this.repo.create(artwork);
    console.log("ARTWORK: ", artwork);
    return this.repo.save(artwork);
  }
}
