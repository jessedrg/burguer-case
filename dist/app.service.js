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
const prisma_service_1 = require("./prisma.service");
const axios_1 = require("axios");
let AppService = class AppService {
    constructor(s3, pisma) {
        this.s3 = s3;
        this.pisma = pisma;
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
            return JSON.parse(data.Body.toString());
        }
    }
    async getPlace(id) {
        const result = await axios_1.default.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${process.env.GOOGLE_KEY}`);
        return result.data.result;
    }
    async getPlaceID(lat, long, name) {
        const newName = name.split(' ');
        let name1 = newName[0];
        for (let i = 1; i < newName.length; i++) {
            if (i === newName.length) {
                name1 += newName[i];
            }
            name1 += '%' + newName[i];
        }
        const direction = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name1}&locationbias=point:${lat},${long}&inputtype=textquery&key=${process.env.GOOGLE_KEY}`;
        try {
            const result = await axios_1.default.get(direction);
            return result;
        }
        catch (e) { }
    }
    async validateGoogle(platformStoreId) {
        const response = await this.pisma.storeChanel.findFirst({
            where: {
                platformStoreId,
                platformStoreName: 'Google',
            },
        });
        if (response === null) {
            return false;
        }
        return true;
    }
    async createGoogle(dataGoogle) {
        await this.pisma.storeChanel.create({
            data: {
                phone: dataGoogle.formatted_phone_number,
                priceLevel: dataGoogle.price_level.toString(),
                rating: dataGoogle.rating,
                platformStoreId: dataGoogle.place_id,
                platformStoreName: dataGoogle.name,
                platformStoreAdress: dataGoogle.formatted_address,
                platformStoreUrl: dataGoogle.url,
            },
        });
        dataGoogle.reviews.map(async (review) => {
            await this.pisma.review.create({
                data: {
                    ratingValue: review.rating,
                    review: review.text,
                    reviewerAvatar: review.profile_photo_url,
                    reviewerFirstName: review.author_name,
                    storeChanelPlatformStoreId: dataGoogle.place_id,
                },
            });
        });
    }
    async createTripadvisor(val) {
        const tripadvisorId = val.platformStoreId.toString();
        await this.pisma.storeChanel.create({
            data: {
                phone: val.phoneNumberOne,
                city: val.cityName,
                priceLevel: val.priceLevel,
                rating: val.ratingsInfo[0].rating,
                platformStoreId: tripadvisorId,
                platformStoreName: val.platformStoreName,
                platformStoreDescription: val.platformStoreDescription,
                platformStoreAdress: val.platformStoreAddress,
                platformStoreUrl: val.platformStoreUrl,
                note: val.note,
                requestToGoogleMaps: false,
            },
        });
        val.reviews.map(async (review) => {
            await this.pisma.review.create({
                data: {
                    ratingValue: review.ratingValue,
                    review: review.review,
                    reviewerId: review.reviewId,
                    reviewerAvatar: review.reviewerAvatar,
                    reviewerFirstName: review.reviewerFirstName,
                    reviewerLastName: review.reviewerLastName,
                    reviewerCount: review.reviewerCount,
                    userId: review.reviewerId,
                    storeChanelPlatformStoreId: tripadvisorId,
                },
            });
        });
    }
    async loadData(file) {
        const fileInfo = await this.getBucket(file);
        fileInfo.map(async (val) => {
            const lat = val.location.lat;
            const lng = val.location.lng;
            const platformStoreName = val.platformStoreName;
            const googleMapsId = await this.getPlaceID(lat, lng, platformStoreName);
            const tripadvisorId = val.platformStoreId.toString();
            const responseTripadvisor = await this.pisma.storeChanel.findUnique({
                where: {
                    platformStoreId: tripadvisorId,
                },
            });
            if (responseTripadvisor === null) {
                const tripadvisorId = val.platformStoreId.toString();
                await this.createTripadvisor(val);
            }
            if (googleMapsId !== undefined) {
                if (googleMapsId.data !== undefined) {
                    if (googleMapsId.data.candidates[0] !== undefined) {
                        const platformStoreIdGoogle = googleMapsId.data.candidates[0].place_id.toString();
                        const responseGoogle = await this.pisma.storeChanel.findUnique({
                            where: {
                                platformStoreId: platformStoreIdGoogle,
                            },
                        });
                        const dataGoogle = await this.getPlace(platformStoreIdGoogle);
                        if (responseGoogle === null) {
                            if (dataGoogle !== undefined) {
                                await this.createGoogle(dataGoogle);
                            }
                        }
                    }
                }
            }
        });
        console.log('true');
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_s3_1.InjectS3)()),
    __metadata("design:paramtypes", [Object, prisma_service_1.PrismaService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map