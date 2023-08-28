import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { CampaignsModule } from './campaigns.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino'
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(CampaignsModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: configService.get<string>('RABBITMQ_URI'),
      queue: 'campaigns'
    }
  }
  )
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(Logger)),
  app.startAllMicroservices();
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
