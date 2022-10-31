import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './user/user.module';
import { SentimentModule } from './sentiment/sentiment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'sentimentService'}), 
            UserModule, SentimentModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
