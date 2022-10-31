import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  var port:number = 8080
  
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
