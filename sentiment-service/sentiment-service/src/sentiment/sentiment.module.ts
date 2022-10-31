import { Module } from '@nestjs/common';
import { SentimentController } from './sentiment.controller';
import { SentimentService } from './sentiment.service';

import { UserSchema } from '../schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [SentimentController],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
  providers: [SentimentService],
  exports: [SentimentService]
})

export class SentimentModule {}