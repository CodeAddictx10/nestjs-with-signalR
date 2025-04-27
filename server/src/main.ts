import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SignalRIoAdapter } from './core/adapter/signalr-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.REAL_TIME_MODE === 'signalr') {
    app.useWebSocketAdapter(new SignalRIoAdapter(app));
  }

  await app.listen(process.env.PORT ?? 4444);
}
void bootstrap();
