import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get('MONGO_URL'),
        };
      },
    }),
    ClientModule,
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
