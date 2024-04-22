import { NestFactory } from '@nestjs/core';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({exceptionFactory: (e) => {
    console.error(e);
    throw new BadRequestException('You shall not pass!');
  }
}));
  const options = new DocumentBuilder()
    .setTitle('ARTIC API')
    .setDescription('Retrieve artwork data using ARTIC API')
    .setVersion('1.0')
    .addBearerAuth(undefined, 'defaultBearerAuth')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('artwork', app, document);
  await app.listen(3000);
}
bootstrap();
