import { song } from './interfaces/song.interface';
import { Model } from "mongoose";
import { SongQueryDocument } from "../schema/songQuery.schema";
export declare class SongService {
    private songQueryModel;
    constructor(songQueryModel: Model<SongQueryDocument>);
    private sentimentServiceURL;
    private readonly sentimentUserPath;
    private readonly sentimentPath;
    getSongSearchResults(songName: string): Promise<Array<song>>;
    getSongRating(songSearch: string): Promise<any>;
    getHighestSentimentSongs(): Promise<any>;
    getLowestSentimentSongs(): Promise<any>;
}
