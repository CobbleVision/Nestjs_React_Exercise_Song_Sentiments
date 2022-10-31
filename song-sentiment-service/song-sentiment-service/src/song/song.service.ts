import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";

import { songQuery } from './interfaces/songQuery.interface'
import { song } from './interfaces/song.interface'
import { user } from './interfaces/user.interface'
import { authMessage } from './interfaces/authMessage.interface';

import { v4 as uuidv4 } from 'uuid';
const bent = require('bent')

import { Model } from "mongoose";
import { SongQuery, SongQueryDocument } from "../schema/songQuery.schema";


@Injectable()
export class SongService {

    constructor(@InjectModel(SongQuery.name) private songQueryModel: Model<SongQueryDocument>) {}

    private sentimentServiceURL =  "http://localhost:5000/"
    private readonly sentimentUserPath:string = "user"
    private readonly sentimentPath:string = "sentiment"  

    async getSongSearchResults(songName: string): Promise<Array<song>> {
        return new Promise(async (resolve, reject) => {
            if(typeof songName === "string"){
                var GeniusClass = require("genius-lyrics");
                var GeniusClient = new GeniusClass.Client();
                const searchResult:Array<any> = await GeniusClient.songs.search(songName);
                var resultArray:Array<song> = []

                if(searchResult.length > 0){
                    if("title" in searchResult[0] && "thumbnail" in searchResult[0] && "id" in searchResult[0] && "artist" in searchResult[0] && "name" in searchResult[0].artist){
                //Loop Through Song Search Results and minimize result data
                
                        for(var i = 0; i <searchResult.length; i++){
                            var songObject:song = {
                                "title":searchResult[i].title,
                                "thumbnail":searchResult[i].thumbnail,
                                "id":searchResult[i].id,
                                "artist":searchResult[i].artist.name
                            }
                            resultArray.push(songObject);   
                        }
                        resolve(resultArray)
                    }else reject("Sorry, the result for this song is not valid. Please try another song.")              
                }else reject("This query did not return any results!");
            }else reject("Sorry! Your songname is not in valid format!")
        })    
    }

    //songSearch is title variable + author variable
    async getSongRating(songSearch: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            if(typeof songSearch === "string"){

                //Get SongLyrics from Genius
                var GeniusClass = require("genius-lyrics");
                var GeniusClient = new GeniusClass.Client();

                var searchResult = await GeniusClient.songs.search(songSearch);
                if(searchResult.length > 0){
                    searchResult = searchResult[0];

                    var lyrics:string = await searchResult.lyrics()

                    //Get Sentiment Value from song
                    var username = uuidv4();
                    var registrationPost = bent(this.sentimentServiceURL, 'POST', "json", 201, 400)         
                    var registeredUser:user = await registrationPost(this.sentimentUserPath, {"username":username, "apikey":""}).catch((err) => reject("Sorry our service is currently not available!"));
                    
                    var authMessageJSON:authMessage = {
                        "username": registeredUser.username,
                        "apikey": registeredUser.apikey,
                        "message":lyrics
                    }

                    var sentimentPost = bent(this.sentimentServiceURL, 'POST', "string", 201, 400)
                    var sentimentValueAsString:string = await sentimentPost(this.sentimentPath, authMessageJSON).catch((err) => reject("Sorry our service is currently not available!"));;
                    var sentimentValue = Number(sentimentValueAsString)

                    var deleteUserCall = bent(this.sentimentServiceURL, 'DELETE', "json", 200, 400);
                    await deleteUserCall(this.sentimentUserPath, registeredUser).catch((err) => reject("Sorry our service is currently not available!"));
                    
                    var songResult:songQuery = {
                        "songName": songSearch,
                        "sentimentRating": sentimentValue
                    }

                    var songDoc:any = await this.songQueryModel.exists({"songName":songResult.songName});
                    
                    if(songDoc == null){
                        var newSongQueryDoc = new this.songQueryModel(songResult);
                        newSongQueryDoc.save(function(err){
                            if(err != null) reject("Sorry our service is currently not available!")
                            else resolve(sentimentValue); 
                        })
                    }else resolve(sentimentValue)
                }else reject("Your Query is not a valid song query!")
                    //Returning Rating as Number
            }else reject("Sorry! Your songname is not in valid format!")
            //Write Rating to Database
        })    
    }


    async getHighestSentimentSongs(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            var songQueryDocuments:Array<songQuery> = await this.songQueryModel.find({}).exec();
            var sortedSongQueryDocuments:Array<songQuery> = songQueryDocuments.sort((songa, songb) => songb.sentimentRating - songa.sentimentRating)
            sortedSongQueryDocuments = sortedSongQueryDocuments.slice(0,5);
            resolve(sortedSongQueryDocuments);
        })    
    }
    async getLowestSentimentSongs(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            var songQueryDocuments:Array<songQuery> = await this.songQueryModel.find({}).exec();
            var sortedSongQueryDocuments:Array<songQuery> = songQueryDocuments.sort((songa, songb) => songa.sentimentRating - songb.sentimentRating)
            sortedSongQueryDocuments = sortedSongQueryDocuments.slice(0,5);
            resolve(sortedSongQueryDocuments);
        })    
    }


}
