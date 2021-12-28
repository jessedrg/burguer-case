import { Injectable } from '@nestjs/common';
import { InjectS3, S3 } from 'nestjs-s3';
import { PrismaService } from './prisma.service';
import axios from 'axios';

@Injectable()
export class AppService {
  constructor(
    @InjectS3() private readonly s3: S3,
    private pisma: PrismaService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  private async getBucket(file: string): Promise<any> {
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
  async getPlace(id: string) {
    const result = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${process.env.GOOGLE_KEY}`,
    );
    return result.data.result;
  }
  async getPlaceID(lat: number, long: number, name: string) {
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
      const result = await axios.get(direction);
      return result;
    } catch (e) {}
  }
  async validateGoogle(platformStoreId: string) {
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
  async createGoogle(dataGoogle: any) {
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
  async createTripadvisor(val: any) {
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
  async loadData(file: string): Promise<void> {
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
            const platformStoreIdGoogle: string =
              googleMapsId.data.candidates[0].place_id.toString();
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
}
