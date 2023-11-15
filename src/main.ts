import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific options
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true, // If you need to include cookies or custom headers
  });

  await app.listen(5000);
}

bootstrap();
