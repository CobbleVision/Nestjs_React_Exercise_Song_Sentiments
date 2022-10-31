//DEPENDENCIES
import { Controller, Get, Header } from '@nestjs/common';
import { ChatServiceTest } from './app.service';

//INTERFACES
import { resultBoolJSON } from '../interfaces/resultBoolJSON.interface'
import { user } from '../interfaces/user.interface'

@Controller()
export class ChatServiceTestController {
  constructor(private readonly chatServiceTest: ChatServiceTest) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async returnTestResults():Promise<resultBoolJSON> {
    return new Promise(async (resolve, reject) => {
      //DUMMY DATA GENERATION!
      var user1:user = {username:"testUser1", apikey:""};
      var user2:user = {username:"testUser2", apikey:""};
      await this.chatServiceTest.setUserArray([user1,user2]).catch((err) => {throw new Error(err)})
      this.chatServiceTest.testChatContent = "This is a test string for a chatbot!";

      //CALLING THE TESTING FUNCTIONS!
      var createResultBool:boolean = await this.chatServiceTest.getCreateUserTestResult();
      var authResultBool:boolean = await this.chatServiceTest.getAuthUserTestResult().catch((err) => {console.log(err); throw new Error(err)});
      var deleteResultBool:boolean = await this.chatServiceTest.getDeleteUserTestResult().catch((err) => {console.log(err); throw new Error(err)});

      //GENERATING CLIENT DATA FOR RENDERING
      let testResultBoolJSON:resultBoolJSON = {
        "createResultBool":createResultBool,
        "authResultBool":authResultBool,
        "deleteResultBool":deleteResultBool
      };

      var jsonString = JSON.stringify(testResultBoolJSON)
      testResultBoolJSON = JSON.parse(jsonString);

      resolve(testResultBoolJSON);
    });
  }
}
