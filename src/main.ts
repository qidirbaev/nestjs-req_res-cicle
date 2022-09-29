import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    abortOnError: false
  });
  try {
    await app.listen(3000);

    console.log('Server running on http://localhost:3000');
  } catch (e) {
    console.error(e);
  }
}
bootstrap();
