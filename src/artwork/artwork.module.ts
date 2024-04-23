import { Module } from '@nestjs/common';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from './artwork.entity';
import { UserModule } from '../user/user.module';
import { AuthGuard } from '../auth/auth-guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artwork]), UserModule, AuthModule],
  controllers: [ArtworkController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    ArtworkService,
  ],
})
export class ArtworkModule {}
