import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { user } from './interfaces/user.interface'

import { Model } from "mongoose";
import { User, UserDocument } from "../schema/user.schema";
import {v4 as uuidv4} from "uuid"

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async registerNewUser(username:string):Promise<user> {
        return new Promise(async (resolve, reject) => {
            
            var userObject:user = {
                "username":username,
                "apikey":uuidv4(),
            }

            var newUser = new this.userModel(userObject);

            newUser.save(function(err){
                if(err != null) resolve(null)
                else resolve(userObject); 
            })
                  
        });
    }    
    
    async findOne(username:string):Promise<user>{
        return new Promise(async (resolve, reject) => {
            var userObject:user = await this.userModel.findOne({"username": username}).exec();
            resolve(userObject)
        })
    } 

    async deleteUser(username:string, apikey:string):Promise<user>{
        return new Promise(async (resolve, reject) => {
            var userObject:user = {
                "username":username,
                "apikey":apikey,
            }
            await this.userModel.findOneAndRemove({"username": userObject.username, "apikey":userObject.apikey}).exec();
            resolve(userObject)
        })
    }
}
