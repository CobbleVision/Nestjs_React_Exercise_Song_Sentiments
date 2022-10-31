import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {SongModule } from './song/song.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: process.env.NODE_ENV + '.env' }),
    MongooseModule.forRoot(process.env.DB_PATH,{dbName: process.env.DB_NAME}),
    SongModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
