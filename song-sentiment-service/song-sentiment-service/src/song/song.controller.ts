import { Controller, Get, Post, Header, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { SongService } from './song.service';
import { songQuery } from './interfaces/songQuery.interface'
import { song } from './interfaces/song.interface'

@Controller("song")
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Post("/")
  @Header('Content-Type', 'application/json')
  async getSongResults(@Req() req, @Res() res): Promise<any>{
    return new Promise(async (resolve, reject) => {
      if("body" in req){
        if("songName" in req.body){
          var songQueryJSONArray:Array<song> | void = await this.songService.getSongSearchResults(req.body.songName).catch((err) => reject(err));;
          resolve(songQueryJSONArray)
        }else reject("Did not receive songName to process request.")
      }else reject("There is no body in this request.")
    }).then((value) => {
      res.json(value);
    }).catch((err) => {
      throw new HttpException(err.toString(),HttpStatus.BAD_REQUEST)
    });
  }

  @Post("/sentiment")
  @Header('Content-Type', 'application/json')
  async getSongRating(@Req() req, @Res() res):Promise<any> {
    return new Promise(async (resolve, reject) => {
      if("body" in req){
        if("songName" in req.body && "songAuthor" in req.body){
          var songQueryJSON:songQuery = await this.songService.getSongRating(req.body.songName + " " + req.body.songAuthor).catch((err) => reject(err));
          resolve(songQueryJSON)
        }else reject("Did not receive songName to process request.")
      }else reject("There is no body in this request.")
    }).then((value) => {
      res.json(value);
    }).catch((err) => {
      throw new HttpException(err.toString(),HttpStatus.BAD_REQUEST)
    });
  }

  @Get("/highest")
  @Header('Content-Type', 'application/json')
  async getTopSentimentSongs(@Req() req, @Res() res):Promise<any> {
    return new Promise(async (resolve, reject) => {
      var songQueryJSON:Array<songQuery> = await this.songService.getHighestSentimentSongs().catch((err) => reject(err));;
      resolve(songQueryJSON)
    }).then((value) => {
      res.json(value);
    }).catch((err) => {
      throw new HttpException(err.toString(),HttpStatus.BAD_REQUEST)
    });
  }

  @Get("/lowest")
  @Header('Content-Type', 'application/json')
  async getLowSentimentSongs(@Req() req, @Res() res):Promise<any> {
    return new Promise(async (resolve, reject) => {
      var songQueryJSON:Array<songQuery> = await this.songService.getLowestSentimentSongs().catch((err) => reject(err));;
      resolve(songQueryJSON)
    }).then((value) => {
      res.json(value);
    }).catch((err) => {
      throw new HttpException(err.toString(),HttpStatus.BAD_REQUEST)
    });
  }

}