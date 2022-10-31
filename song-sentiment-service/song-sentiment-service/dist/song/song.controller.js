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
exports.SongController = void 0;
const common_1 = require("@nestjs/common");
const song_service_1 = require("./song.service");
let SongController = class SongController {
    constructor(songService) {
        this.songService = songService;
    }
    async getSongResults(req, res) {
        return new Promise(async (resolve, reject) => {
            if ("body" in req) {
                if ("songName" in req.body) {
                    var songQueryJSONArray = await this.songService.getSongSearchResults(req.body.songName).catch((err) => reject(err));
                    ;
                    resolve(songQueryJSONArray);
                }
                else
                    reject("Did not receive songName to process request.");
            }
            else
                reject("There is no body in this request.");
        }).then((value) => {
            res.json(value);
        }).catch((err) => {
            throw new common_1.HttpException(err.toString(), common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getSongRating(req, res) {
        return new Promise(async (resolve, reject) => {
            if ("body" in req) {
                if ("songName" in req.body && "songAuthor" in req.body) {
                    var songQueryJSON = await this.songService.getSongRating(req.body.songName + " " + req.body.songAuthor).catch((err) => reject(err));
                    resolve(songQueryJSON);
                }
                else
                    reject("Did not receive songName to process request.");
            }
            else
                reject("There is no body in this request.");
        }).then((value) => {
            res.json(value);
        }).catch((err) => {
            throw new common_1.HttpException(err.toString(), common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getTopSentimentSongs(req, res) {
        return new Promise(async (resolve, reject) => {
            var songQueryJSON = await this.songService.getHighestSentimentSongs().catch((err) => reject(err));
            ;
            resolve(songQueryJSON);
        }).then((value) => {
            res.json(value);
        }).catch((err) => {
            throw new common_1.HttpException(err.toString(), common_1.HttpStatus.BAD_REQUEST);
        });
    }
    async getLowSentimentSongs(req, res) {
        return new Promise(async (resolve, reject) => {
            var songQueryJSON = await this.songService.getLowestSentimentSongs().catch((err) => reject(err));
            ;
            resolve(songQueryJSON);
        }).then((value) => {
            res.json(value);
        }).catch((err) => {
            throw new common_1.HttpException(err.toString(), common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
__decorate([
    (0, common_1.Post)("/"),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "getSongResults", null);
__decorate([
    (0, common_1.Post)("/sentiment"),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "getSongRating", null);
__decorate([
    (0, common_1.Get)("/highest"),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "getTopSentimentSongs", null);
__decorate([
    (0, common_1.Get)("/lowest"),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "getLowSentimentSongs", null);
SongController = __decorate([
    (0, common_1.Controller)("song"),
    __metadata("design:paramtypes", [song_service_1.SongService])
], SongController);
exports.SongController = SongController;
//# sourceMappingURL=song.controller.js.map