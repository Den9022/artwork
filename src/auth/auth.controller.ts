import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { LoginDto } from './dtos/login.dto';
import { Public } from './constants';
import { IUser } from '../user/user.interface';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiBody({
    description: 'Login credentials',
    examples: {
      example1: {
        value: { email: 'user1@email.com', password: 'password' },
        summary: 'User 1',
      },
      example2: {
        value: { email: 'user2@email.com', password: 'password' },
        summary: 'User 2',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User authenticated successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async login(@Body() credentials: LoginDto) {
    try {
      const user: IUser = await this.authService.validateUser(
        credentials.email,
        credentials.password,
      );
      const token = await this.authService.generateToken({ email: user.email });
      return { token };
    } catch (error) {
      return { error: error };
    }
  }
}
