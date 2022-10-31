import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    generateSentiment(req: any, res: any): Promise<any>;
}
