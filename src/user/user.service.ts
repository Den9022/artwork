import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<IUser>) {}

  async create(): Promise<IUser> {
    const user: IUser = this.repo.create({
      email: 'user2@email.com',
      password: 'password',
    });
    return this.repo.save(user);
  }

  async findOne(id: number): Promise<IUser> {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({ id });
  }

  async validateUser(email: string, password: string): Promise<IUser> {
    if (!email || !password) {
      return null;
    }
    return this.repo.findOneBy({ email, password });
  }
}
