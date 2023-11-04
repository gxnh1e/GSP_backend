import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swagger } from './swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const servicePort = config.get<string>('SERVICE_PORT', '3000');
  const NODE_ENV = config.get<string>('NODE_ENV', 'development');


  await swagger(app);

  await app.listen(servicePort);

  Logger.log(
    `Server is running on localhost:${servicePort} with ${NODE_ENV} mode`,
    'Bootstrap',
  );
}
bootstrap();
