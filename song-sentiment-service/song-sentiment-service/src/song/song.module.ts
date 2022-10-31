import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';

import { songQuerySchema } from '../schema/songQuery.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [SongController],
  imports: [MongooseModule.forFeature([{ name: 'SongQuery', schema: songQuerySchema}])],
  providers: [SongService],
  exports: [SongService]
})

export class SongModule {
}