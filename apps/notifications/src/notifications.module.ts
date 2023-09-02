import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi'
import { LoggerModule } from '@app/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: joi.object({
        HTTP_PORT: joi.string().required(),
        RABBITMQ_URI: joi.string().required(),
        SMTP_USER: joi.string().required(),
        GOOGLE_OAUTH_CLIENT_ID: joi.string().required(),
        GOOGLE_OAUTH_CLIENT_SECRET: joi.string().required(),
        GOOGLE_OAUTH_REFRESH_TOKEN: joi.string().required()
      })
    }),
    LoggerModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
