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
exports.ChatController = void 0;
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async generateSentiment(req, res) {
        return new Promise(async (resolve, reject) => {
            if ("body" in req) {
                if ("message" in req.body && (typeof req.body.message).toString() == "string" && "username" in req.body && "apikey" in req.body) {
                    var chatResponse = await this.chatService.getMessageSentiment(req.body.message, req.body.username, req.body.apikey);
                    if (chatResponse != null)
                        resolve(chatResponse);
                    else
                        reject("Login with apikey and Username was rejected. Check your Details");
                }
                else
                    reject("You did not provide a valid message, username or apikey!");
            }
            else
                reject("There is no request body!");
        }).then((value) => {
            res.send(value);
        }).catch((err) => {
            throw new common_1.HttpException(err.toString(), common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "generateSentiment", null);
ChatController = __decorate([
    (0, common_1.Controller)("chat"),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map