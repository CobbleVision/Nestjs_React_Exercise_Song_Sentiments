import { Controller, Post, Delete, Header, Req, Res, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { user } from './interfaces/user.interface'

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  async registerNewUser(@Req() req, @Res() res):Promise<any> {
    return new Promise(async (resolve, reject) => {
      if("body" in req){
        if("username" in req.body){
            var newUser:user = await this.userService.registerNewUser(req.body.username)
            if(newUser != null) resolve(newUser);
            else reject("The username is already taken!")
          }else reject("There is no username in the request body!")
      }else reject("There is no request body!")
    }).then((value) => {
      res.json(value);
    }).catch((err) => {
      throw new HttpException(err.toString(),HttpStatus.BAD_REQUEST)
    });
  }

  @Delete()
  @Header('Content-Type', 'application/json')
  async deleteUser(@Req() req, @Res() res):Promise<any> {
    return new Promise(async (resolve, reject) => {
      if("body" in req){
        if("username" in req.body && "apikey" in req.body){
            var newUser:user = await this.userService.deleteUser(req.body.username, req.body.apikey);
            resolve(newUser);
          }else reject("There is no username or no apikey in the request body!")
      }else reject("There is no request body!")
    }).then((value) => {
      res.json(value);
    }).catch((err) => {
      throw new HttpException(err.toString(),HttpStatus.BAD_REQUEST)
    });
  }
}