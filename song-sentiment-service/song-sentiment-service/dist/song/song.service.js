"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
const bent = require('bent');
const mongoose_2 = require("mongoose");
const songQuery_schema_1 = require("../schema/songQuery.schema");
let SongService = class SongService {
    constructor(songQueryModel) {
        this.songQueryModel = songQueryModel;
        this.sentimentServiceURL = "http://localhost:5000/";
        this.sentimentUserPath = "user";
        this.sentimentPath = "sentiment";
    }
    async getSongSearchResults(songName) {
        return new Promise(async (resolve, reject) => {
            if (typeof songName === "string") {
                var GeniusClass = require("genius-lyrics");
                var GeniusClient = new GeniusClass.Client();
                const searchResult = await GeniusClient.songs.search(songName);
                var resultArray = [];
                if (searchResult.length > 0) {
                    if ("title" in searchResult[0] && "thumbnail" in searchResult[0] && "id" in searchResult[0] && "artist" in searchResult[0] && "name" in searchResult[0].artist) {
                        for (var i = 0; i < searchResult.length; i++) {
                            var songObject = {
                                "title": searchResult[i].title,
                                "thumbnail": searchResult[i].thumbnail,
                                "id": searchResult[i].id,
                                "artist": searchResult[i].artist.name
                            };
                            resultArray.push(songObject);
                        }
                        resolve(resultArray);
                    }
                    else
                        reject("Sorry, the result for this song is not valid. Please try another song.");
                }
                else
                    reject("This query did not return any results!");
            }
            else
                reject("Sorry! Your songname is not in valid format!");
        });
    }
    async getSongRating(songSearch) {
        return new Promise(async (resolve, reject) => {
            if (typeof songSearch === "string") {
                var GeniusClass = require("genius-lyrics");
                var GeniusClient = new GeniusClass.Client();
                var searchResult = await GeniusClient.songs.search(songSearch);
                if (searchResult.length > 0) {
                    searchResult = searchResult[0];
                    var lyrics = await searchResult.lyrics();
                    var username = (0, uuid_1.v4)();
                    var registrationPost = bent(this.sentimentServiceURL, 'POST', "json", 201, 400);
                    var registeredUser = await registrationPost(this.sentimentUserPath, { "username": username, "apikey": "" }).catch((err) => reject("Sorry our service is currently not available!"));
                    var authMessageJSON = {
                        "username": registeredUser.username,
                        "apikey": registeredUser.apikey,
                        "message": lyrics
                    };
                    var sentimentPost = bent(this.sentimentServiceURL, 'POST', "string", 201, 400);
                    var sentimentValueAsString = await sentimentPost(this.sentimentPath, authMessageJSON).catch((err) => reject("Sorry our service is currently not available!"));
                    ;
                    var sentimentValue = Number(sentimentValueAsString);
                    var deleteUserCall = bent(this.sentimentServiceURL, 'DELETE', "json", 200, 400);
                    await deleteUserCall(this.sentimentUserPath, registeredUser).catch((err) => reject("Sorry our service is currently not available!"));
                    var songResult = {
                        "songName": songSearch,
                        "sentimentRating": sentimentValue
                    };
                    var songDoc = await this.songQueryModel.exists({ "songName": songResult.songName });
                    if (songDoc == null) {
                        var newSongQueryDoc = new this.songQueryModel(songResult);
                        newSongQueryDoc.save(function (err) {
                            if (err != null)
                                reject("Sorry our service is currently not available!");
                            else
                                resolve(sentimentValue);
                        });
                    }
                    else
                        resolve(sentimentValue);
                }
                else
                    reject("Your Query is not a valid song query!");
            }
            else
                reject("Sorry! Your songname is not in valid format!");
        });
    }
    async getHighestSentimentSongs() {
        return new Promise(async (resolve, reject) => {
            var songQueryDocuments = await this.songQueryModel.find({}).exec();
            var sortedSongQueryDocuments = songQueryDocuments.sort((songa, songb) => songb.sentimentRating - songa.sentimentRating);
            sortedSongQueryDocuments = sortedSongQueryDocuments.slice(0, 5);
            resolve(sortedSongQueryDocuments);
        });
    }
    async getLowestSentimentSongs() {
        return new Promise(async (resolve, reject) => {
            var songQueryDocuments = await this.songQueryModel.find({}).exec();
            var sortedSongQueryDocuments = songQueryDocuments.sort((songa, songb) => songa.sentimentRating - songb.sentimentRating);
            sortedSongQueryDocuments = sortedSongQueryDocuments.slice(0, 5);
            resolve(sortedSongQueryDocuments);
        });
    }
};
SongService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(songQuery_schema_1.SongQuery.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SongService);
exports.SongService = SongService;
//# sourceMappingURL=song.service.js.map