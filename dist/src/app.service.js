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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_s3_1 = require("nestjs-s3");
let AppService = class AppService {
    constructor(s3) {
        this.s3 = s3;
    }
    getHello() {
        return 'Hello World!';
    }
    async getBucket(file) {
        const data = await this.s3
            .getObject({
            Bucket: 'tripadvisor-burguercase',
            Key: file,
        })
            .promise();
        if (data !== undefined) {
            return data.Body.toString();
        }
    }
    async validateGoogle(file) {
        const fileInfo = await this.getBucket(file);
        console.log(JSON.parse(fileInfo));
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_s3_1.InjectS3)()),
    __metadata("design:paramtypes", [Object])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map