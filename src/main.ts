import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {FallbackFilter} from "./filters/fallback.filter";
import {ErrorFilter} from "./filters/error.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('ms');
  app.useGlobalFilters(
      new FallbackFilter(),
      new ErrorFilter(),
  );
  await app.listen(AppModule.PORT);
}
bootstrap();
