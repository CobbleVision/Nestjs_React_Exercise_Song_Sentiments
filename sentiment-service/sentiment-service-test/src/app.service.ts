import { ConsoleLogger, Injectable } from '@nestjs/common';
import { authMessage } from 'interfaces/authMessage.interface';
import { user } from '../interfaces/user.interface'
const bent = require('bent')

@Injectable()
export class ChatServiceTest {

  private users:user[] = [];
  private readonly url:string = "http://localhost:5000/"
  private readonly userPath:string = "user"
  private readonly sentimentPath:string = "sentiment"

  public testChatContent:string = "This is a test string. You can set it from anywhere.";

  //MANAGING THE USER OBJECTS
  async setUserArray(users:user[]):Promise<user[]>{
    return new Promise((resolve, reject) => {
        this.users = users;
        resolve(this.users)
    });
  }

  async getUserArray():Promise<user[]>{
    return new Promise((resolve, reject) => {
        resolve(this.users)
    });
  }

  //TESTING WITH THE USER OBJECT
  async getCreateUserTestResult():Promise<boolean>{
    return new Promise(async (resolve, reject) => {
      
       var responseArray = [];
      
       for(var i = 0; i< this.users.length; i++){

        //Catchin ECONNREFUSED is not possible by status codes
         var post = bent(this.url, 'POST', "json", 201, 400)         
         var response:user = await post(this.userPath, this.users[i]).catch((err) => resolve(false));

         if(response != undefined){
          if("username" in response && "apikey" in response){
            if(response.username == this.users[i].username){
              responseArray.push(response);
            }else resolve(false);
          }else resolve(false);
         }else resolve(false);
       }

      if(responseArray.length > 0) this.setUserArray(responseArray);
      resolve(true);
    });
  }

  async getAuthUserTestResult():Promise<boolean>{
    return new Promise(async (resolve, reject) => {
      var responseArray = [];
      
       for(var i = 0; i < this.users.length; i++){
        
        var authMessageJSON:authMessage = {
          "username": this.users[i].username,
          "apikey": this.users[i].apikey,
          "message":this.testChatContent
        }

        var post = bent(this.url, 'POST', "string", 201, 400)
        var responseString:string = await post(this.sentimentPath, authMessageJSON).catch((err) => resolve(false));;

        if(responseString != undefined){
          if(typeof responseString === "string" && typeof Number(responseString) === "number"){
            responseArray.push(responseString);
          }
         }else resolve(false);
        }
      resolve(true);

    });
  }

  async getDeleteUserTestResult():Promise<boolean>{
    return new Promise(async (resolve, reject) => {
      var responseArray = [];
      
      for(var i = 0; i < this.users.length; i++){
        var deleteCall = bent(this.url, 'DELETE', "json", 200, 400);
        var response:user = await deleteCall(this.userPath, this.users[i]).catch((err) => resolve(false));

        if(response != undefined){
          if("username" in response && "apikey" in response){
            if(response.username == this.users[i].username && response.apikey == this.users[i].apikey){
              responseArray.push(response);
            }else resolve(false);
          }else resolve(false)
        }else resolve(false);
      }
      resolve(true);
    });
  }

}
