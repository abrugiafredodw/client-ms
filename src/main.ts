import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FallbackFilter } from './filters/fallback.filter';
import { ErrorFilter } from './filters/error.filter';
import { HealthFilter } from './filters/health.filter';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.setGlobalPrefix('ms');
  app.useGlobalInterceptors(new LoggerErrorInterceptor());
  app.useGlobalFilters(
    new FallbackFilter(),
    new ErrorFilter(),
    new HealthFilter(),
  );
  await app.listen(AppModule.PORT);
}
bootstrap();
