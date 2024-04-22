import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwthService: JwtService;

  let token: string;
  beforeAll(async () => {
    jwthService = new JwtService({ secret: jwtConstants.secret });
    token = jwthService.sign({ email: 'user1@email.com' });

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }); 

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/artwork/listByUser')
      .expect(401)
      .expect('Unauthorized');
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/artwork/listByUser')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
  });
});
