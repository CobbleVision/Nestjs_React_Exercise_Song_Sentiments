import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello, this is a tool to send messages for sentiment analysis. The result is either positive or negative!';
  }
}
