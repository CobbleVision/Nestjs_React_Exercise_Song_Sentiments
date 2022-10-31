import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { user } from '../user/interfaces/user.interface'

import { Model } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";

var Sentiment = require('sentiment');

@Injectable()
export class SentimentService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    async getMessageSentiment(message:string, username:string, apikey:string):Promise<string> {
        return new Promise(async (resolve, reject) => {
            var userDoc:user = await this.userModel.findOne({"username":username, "apikey":apikey}).exec();
            //TODO Implement API Call To Chatbot!
            if(userDoc != null){
                var sentiment = new Sentiment();
                var result = sentiment.analyze(message);
                resolve(result.score.toString());
            }
            else resolve(null);        
        })
    }    
}
