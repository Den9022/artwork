import { Artwork } from 'src/artwork/artwork.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Artwork, (artwork) => artwork.user, { nullable: true })
  @JoinColumn()
  artworks: Artwork[];

}
