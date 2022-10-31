import { SongService } from './song.service';
export declare class SongController {
    private readonly songService;
    constructor(songService: SongService);
    getSongResults(req: any, res: any): Promise<any>;
    getSongRating(req: any, res: any): Promise<any>;
    getTopSentimentSongs(req: any, res: any): Promise<any>;
    getLowSentimentSongs(req: any, res: any): Promise<any>;
}
