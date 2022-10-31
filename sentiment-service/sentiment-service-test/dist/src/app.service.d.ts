import { user } from '../interfaces/user.interface';
export declare class ChatServiceTest {
    private users;
    private readonly url;
    private readonly userPath;
    private readonly sentimentPath;
    testChatContent: string;
    setUserArray(users: user[]): Promise<user[]>;
    getUserArray(): Promise<user[]>;
    getCreateUserTestResult(): Promise<boolean>;
    getAuthUserTestResult(): Promise<boolean>;
    getDeleteUserTestResult(): Promise<boolean>;
}
