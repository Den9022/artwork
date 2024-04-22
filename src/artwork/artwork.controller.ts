import { Controller, Get, NotFoundException, Param, Query, } from '@nestjs/common';
import { ArtworkDto } from './dtos/artwork.dto';
import { ArtworkService } from './artwork.service';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { IArtwork } from './artwork.interface';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/user/user.interface';
import { AuthService } from 'src/auth/auth.service';

@Controller('artwork')
@ApiTags('artwork')
export class ArtworkController {
  constructor(private artworkService: ArtworkService, private userService: UserService, private authService: AuthService) {}

  @ApiBearerAuth('defaultBearerAuth')
  @Get('/pagination')
  @ApiOperation({ summary: 'retrieve paginated artwork' })
  @ApiQuery({ name: 'page', required: true, type: Number, example: 2})
  @ApiQuery({ name: 'limit', required: true, type: Number, example: 5 })
  async getPaginatedArtworkById(@Query('page') page: number, @Query('limit') limit: number) {
    const artworks: IArtwork[] = await this.artworkService.fetchAllArtworks(
      page,
      limit,
    );
    if (artworks.length < 0) {
      throw new NotFoundException('Paginated Artworks not found');
    }
    return artworks;
  }
  
  @ApiBearerAuth('defaultBearerAuth')
  @Get('/:id')
  @ApiOperation({ summary: 'retrieve a single artwork by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 129884,
    description: 'a single artwork that exists int the ARTIC system',
  })
  async getArtworkById(@Param() paramArtwork: ArtworkDto) {
    const artwork: IArtwork = await this.artworkService.fetchArtwork(
      paramArtwork.id,
    );
    if (!artwork) {
      throw new NotFoundException('Artwork not found');
    }
    return artwork;
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Get('/listByUser/:id')
  @ApiOperation({ summary: 'retrieve a single user by id and artworks owned by him' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    description: 'artworks owned by certain user',
  })
  async listByUser(@Param('id') id: string) {
    const user: IUser = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const artworks: IArtwork[] = await this.artworkService.listByUser(user);

    return artworks;
  }

  @ApiBearerAuth('defaultBearerAuth')
  @Get('buy/:id')
  @ApiOperation({ summary: 'buying a single artwork by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 129884,
    description: 'buying an artwork that exists int the ARTIC system',
  })
  async buyingArtwork(@Param() paramArtwork: ArtworkDto) {
    const artwork: IArtwork = await this.artworkService.fetchArtwork(
      paramArtwork.id,
    );
    if (!artwork) {
      throw new NotFoundException('Artwork not found');
    }

    this.artworkService.buyingArtwork(artwork, this.authService.loggedInUser);
    return artwork;
  }
}
