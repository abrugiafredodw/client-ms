import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { HealthModule } from './health/health.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('MONGO_URL'),
        };
      },
      inject: [ConfigService],
    }),
    ClientModule,
    HealthModule,
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          pinoHttp: {
            name: config.get('LOG_NAME'),
            level: config.get('LOG_LEVEL'),
            transport:
              config.get('ENV') === 'prod'
                ? { target: config.get('LOG_TRANSPORT') }
                : undefined,
            useLevelLabels: true,
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  public static PORT: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.PORT = parseInt(this.configService.get('PORT'));
  }
}
