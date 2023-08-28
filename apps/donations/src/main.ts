import { FilterQuery } from 'mongoose';
import { NestFactory } from '@nestjs/core';
import { DonationsModule } from './donations.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(DonationsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: configService.getOrThrow<string>('RABBITMQ_URI'),
      queue: 'donations'
    }
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({whitelist: true}));
  app.useLogger(app.get(Logger));
  app.startAllMicroservices();
  await app.listen(configService.get<string>('HTTP_PORT'));
}
bootstrap();