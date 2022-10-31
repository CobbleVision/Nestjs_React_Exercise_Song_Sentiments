"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatServiceTest = void 0;
const common_1 = require("@nestjs/common");
const bent = require('bent');
let ChatServiceTest = class ChatServiceTest {
    constructor() {
        this.users = [];
        this.url = "http://localhost:5000/";
        this.userPath = "user";
        this.sentimentPath = "sentiment";
        this.testChatContent = "This is a test string. You can set it from anywhere.";
    }
    async setUserArray(users) {
        return new Promise((resolve, reject) => {
            this.users = users;
            resolve(this.users);
        });
    }
    async getUserArray() {
        return new Promise((resolve, reject) => {
            resolve(this.users);
        });
    }
    async getCreateUserTestResult() {
        return new Promise(async (resolve, reject) => {
            var responseArray = [];
            for (var i = 0; i < this.users.length; i++) {
                var post = bent(this.url, 'POST', "json", 201, 400);
                var response = await post(this.userPath, this.users[i]).catch((err) => resolve(false));
                if (response != undefined) {
                    if ("username" in response && "apikey" in response) {
                        if (response.username == this.users[i].username) {
                            responseArray.push(response);
                        }
                        else
                            resolve(false);
                    }
                    else
                        resolve(false);
                }
                else
                    resolve(false);
            }
            if (responseArray.length > 0)
                this.setUserArray(responseArray);
            resolve(true);
        });
    }
    async getAuthUserTestResult() {
        return new Promise(async (resolve, reject) => {
            var responseArray = [];
            for (var i = 0; i < this.users.length; i++) {
                var authMessageJSON = {
                    "username": this.users[i].username,
                    "apikey": this.users[i].apikey,
                    "message": this.testChatContent
                };
                var post = bent(this.url, 'POST', "string", 201, 400);
                var responseString = await post(this.sentimentPath, authMessageJSON).catch((err) => resolve(false));
                ;
                if (responseString != undefined) {
                    if (typeof responseString === "string" && typeof Number(responseString) === "number") {
                        responseArray.push(responseString);
                    }
                }
                else
                    resolve(false);
            }
            resolve(true);
        });
    }
    async getDeleteUserTestResult() {
        return new Promise(async (resolve, reject) => {
            var responseArray = [];
            for (var i = 0; i < this.users.length; i++) {
                var deleteCall = bent(this.url, 'DELETE', "json", 200, 400);
                var response = await deleteCall(this.userPath, this.users[i]).catch((err) => resolve(false));
                if (response != undefined) {
                    if ("username" in response && "apikey" in response) {
                        if (response.username == this.users[i].username && response.apikey == this.users[i].apikey) {
                            responseArray.push(response);
                        }
                        else
                            resolve(false);
                    }
                    else
                        resolve(false);
                }
                else
                    resolve(false);
            }
            resolve(true);
        });
    }
};
ChatServiceTest = __decorate([
    (0, common_1.Injectable)()
], ChatServiceTest);
exports.ChatServiceTest = ChatServiceTest;
//# sourceMappingURL=app.service.js.map