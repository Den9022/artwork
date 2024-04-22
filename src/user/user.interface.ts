import { IArtwork } from 'src/artwork/artwork.interface';

export interface IUser {
  id: number;
  email: string;
  password: string;
  artworks: IArtwork[];
}
