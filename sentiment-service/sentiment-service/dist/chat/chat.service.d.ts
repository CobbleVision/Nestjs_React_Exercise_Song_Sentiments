import { Model } from "mongoose";
import { UserDocument } from "../schema/user.schema";
export declare class ChatService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getMessageSentiment(message: string, username: string, apikey: string): Promise<string>;
}
