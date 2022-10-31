import { SentimentService } from './sentiment.service';
export declare class SentimentController {
    private readonly sentimentService;
    constructor(sentimentService: SentimentService);
    generateSentiment(req: any, res: any): Promise<any>;
}
