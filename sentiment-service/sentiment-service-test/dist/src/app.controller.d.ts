import { ChatServiceTest } from './app.service';
import { resultBoolJSON } from '../interfaces/resultBoolJSON.interface';
export declare class ChatServiceTestController {
    private readonly chatServiceTest;
    constructor(chatServiceTest: ChatServiceTest);
    returnTestResults(): Promise<resultBoolJSON>;
}
