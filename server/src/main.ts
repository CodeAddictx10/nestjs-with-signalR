import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SignalRIoAdapter } from './core/adapter/signalr-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5174',
    ],
  });
  if (process.env.REAL_TIME_MODE === 'signalr') {
    app.useWebSocketAdapter(new SignalRIoAdapter(app));
  }
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 4444);
}
void bootstrap();
