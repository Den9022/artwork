import { User } from 'src/user/user.entity';
import {
  AfterInsert,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Artwork {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column()
  author: string;

  @Column({ nullable: true })
  thumbnail: string | null;

  @ManyToOne(() => User, user => user.artworks, { nullable: true })
  @JoinColumn()
  user: User | null;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Artwork with title', this.title);
  }
}
