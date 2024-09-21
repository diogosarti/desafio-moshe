import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: [process.env.WEB_URL, 'http://127.0.0.1:5173'] },
  });
  await app.listen(3000);
}
bootstrap();
