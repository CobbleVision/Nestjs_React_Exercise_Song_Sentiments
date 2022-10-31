import { Controller, Get, Post, Header, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { SentimentService } from './sentiment.service';

@Controller("sentiment")
export class SentimentController {
  constructor(private readonly sentimentService: SentimentService) {}

  @Post()
  async generateSentiment(@Req() req, @Res() res):Promise<any> {
    return new Promise(async (resolve, reject) => {
      if("body" in req){
        if("message" in req.body && (typeof req.body.message).toString() == "string" && "username" in req.body && "apikey" in req.body){
            var chatResponse:string = await this.sentimentService.getMessageSentiment(req.body.message, req.body.username, req.body.apikey);
            if (chatResponse != null) resolve(chatResponse);
            else reject("Login with apikey and Username was rejected. Check your Details")
        }else reject("You did not provide a valid message, username or apikey!")
      }else reject("There is no request body!")
    }).then((value) => {
      res.send(value)
    }).catch((err) => {
      throw new HttpException(err.toString(),HttpStatus.BAD_REQUEST)
    });
  }
}