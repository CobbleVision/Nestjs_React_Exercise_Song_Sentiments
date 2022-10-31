import { user } from './interfaces/user.interface';
import { Model } from "mongoose";
import { UserDocument } from "../schema/user.schema";
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    registerNewUser(username: string): Promise<user>;
    findOne(username: string): Promise<user>;
    deleteUser(username: string, apikey: string): Promise<user>;
}
