import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpResponseInterceptor } from './core/interceptors/http-response.interceptor';
import { HttpExceptionFilter } from './core/filters/http-exception.filter';
import { validationPipe } from './core/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*' });
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(validationPipe);
  await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
