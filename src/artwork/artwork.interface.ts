import { IUser } from "src/user/user.interface";

export interface IArtwork {
    id: number;
    title: string;
    author: string;
    thumbnail?: string | null;
    user?: IUser | null;
}
  