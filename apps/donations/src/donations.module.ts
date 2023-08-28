import { Inject, Module } from '@nestjs/common';
import { DonationsController } from './donations.controller';
import { DonationsService } from './donations.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, CAMPAIGN_SERVICE, PAYMENT_SERVICE, LoggerModule, DatabaseModule } from '@app/common';
import { DonationsRepository } from './donations.repository';
import { DonationDocument, DonationSchema } from './models/donate.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        HTTP_PORT: Joi.string().required(),
        RABBITMQ_URI: Joi.string().required(),
      })
    }),
    DatabaseModule, 
    DatabaseModule.forFeature([
      {name: DonationDocument.name, schema: DonationSchema}]),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: PAYMENT_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: 'payments',
          }
        }),
        inject: [ConfigService],
      },
      {
        imports: [ConfigModule],
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: 'auth',
          }
        }),
        inject: [ConfigService],
      },
      {
        imports: [ConfigModule],
        name: CAMPAIGN_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URI')],
            queue: 'campaigns'
          },
        }),
        inject: [ConfigService]
      },
    ]),
  ],
  controllers: [DonationsController],
  providers: [DonationsService, DonationsRepository],
})
export class DonationsModule {}
