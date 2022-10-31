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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServiceTestController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let ChatServiceTestController = class ChatServiceTestController {
    constructor(chatServiceTest) {
        this.chatServiceTest = chatServiceTest;
    }
    async returnTestResults() {
        return new Promise(async (resolve, reject) => {
            var user1 = { username: "testUser1", apikey: "" };
            var user2 = { username: "testUser2", apikey: "" };
            await this.chatServiceTest.setUserArray([user1, user2]).catch((err) => { throw new Error(err); });
            this.chatServiceTest.testChatContent = "This is a test string for a chatbot!";
            var createResultBool = await this.chatServiceTest.getCreateUserTestResult();
            var authResultBool = await this.chatServiceTest.getAuthUserTestResult().catch((err) => { console.log(err); throw new Error(err); });
            var deleteResultBool = await this.chatServiceTest.getDeleteUserTestResult().catch((err) => { console.log(err); throw new Error(err); });
            let testResultBoolJSON = {
                "createResultBool": createResultBool,
                "authResultBool": authResultBool,
                "deleteResultBool": deleteResultBool
            };
            var jsonString = JSON.stringify(testResultBoolJSON);
            testResultBoolJSON = JSON.parse(jsonString);
            resolve(testResultBoolJSON);
        });
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Header)('Content-Type', 'application/json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChatServiceTestController.prototype, "returnTestResults", null);
ChatServiceTestController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.ChatServiceTest])
], ChatServiceTestController);
exports.ChatServiceTestController = ChatServiceTestController;
//# sourceMappingURL=app.controller.js.map