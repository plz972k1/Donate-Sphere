import { CampaignDocument, CampaignSchema } from './models/campaign.schema';
import { Inject, Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { DatabaseModule, LoggerModule, AUTH_SERVICE, DONATION_SERVICE } from '@app/common';
import { CampaignsRepository } from './campaigns.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        HTTP_PORT: Joi.string().required(),
      })
    }),
    DatabaseModule, 
    DatabaseModule.forFeature([
      {name: CampaignDocument.name, schema: CampaignSchema}]),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
            queue: 'auth',
          },
        }),
        inject: [ConfigService],
    },
    {
      imports: [ConfigModule],
      name: DONATION_SERVICE,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.getOrThrow<string>('RABBITMQ_URI')],
          queue: 'donations',
        }
      }),
      inject: [ConfigService]
    }
  ])
  ],
  controllers: [CampaignsController],
  providers: [CampaignsService, CampaignsRepository]
})
export class CampaignsModule {}
