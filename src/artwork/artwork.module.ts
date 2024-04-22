import { Module } from '@nestjs/common';
import { ArtworkController } from './artwork.controller';
import { ArtworkService } from './artwork.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artwork } from './artwork.entity';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from 'src/auth/auth-guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Artwork]), UserModule, AuthModule],
  controllers: [ArtworkController],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard,
  }, ArtworkService],
})
export class ArtworkModule {}
