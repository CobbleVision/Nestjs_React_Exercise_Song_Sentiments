import { Module } from '@nestjs/common';
import { ChatServiceTestController } from './app.controller';
import { ChatServiceTest } from './app.service';

@Module({
  imports: [],
  controllers: [ChatServiceTestController],
  providers: [ChatServiceTest],
})
export class AppModule {}
