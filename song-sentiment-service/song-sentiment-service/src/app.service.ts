import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello this is a tool to analyse songs with sentiment analysis to identify positive and negative songs.';
  }
  
}
