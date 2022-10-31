"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentimentModule = void 0;
const common_1 = require("@nestjs/common");
const sentiment_controller_1 = require("./sentiment.controller");
const sentiment_service_1 = require("./sentiment.service");
const user_schema_1 = require("../schema/user.schema");
const mongoose_1 = require("@nestjs/mongoose");
let SentimentModule = class SentimentModule {
};
SentimentModule = __decorate([
    (0, common_1.Module)({
        controllers: [sentiment_controller_1.SentimentController],
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }])],
        providers: [sentiment_service_1.SentimentService],
        exports: [sentiment_service_1.SentimentService]
    })
], SentimentModule);
exports.SentimentModule = SentimentModule;
//# sourceMappingURL=sentiment.module.js.map