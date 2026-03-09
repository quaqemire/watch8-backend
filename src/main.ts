import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function startApp() {
  const PORT = process.env.PORT ?? 4000;

  const app = await NestFactory.create(AppModule, {
    cors: { origin: true, credentials: true },
  });

  app.use(cookieParser());
  app.setGlobalPrefix('api');

  await app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
}
startApp();
