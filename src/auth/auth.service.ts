import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/user/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  public loggedInUser: IUser;

  constructor(private jwtService: JwtService, private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<IUser> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw 'Invalid credentials';
    }
    this.loggedInUser = user;
    return user;
  }
  async generateToken(payload): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return null;
    }
  }
}
