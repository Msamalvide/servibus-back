import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { swaggerDocument } from './config/swagger';
import { validationConfig } from './config/pipes';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Configuracion Pipes
  app.useGlobalPipes(new ValidationPipe(validationConfig))

  //Configuracion swagger
  const document = SwaggerModule.createDocument(app,swaggerDocument)
  SwaggerModule.setup('api',app,document)

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
