import { S3 } from 'nestjs-s3';
import { PrismaService } from './prisma.service';
export declare class AppService {
    private readonly s3;
    private pisma;
    constructor(s3: S3, pisma: PrismaService);
    getHello(): string;
    private getBucket;
    getPlace(id: string): Promise<any>;
    getPlaceID(lat: number, long: number, name: string): Promise<import("axios").AxiosResponse<any, any>>;
    validateGoogle(platformStoreId: string): Promise<boolean>;
    createGoogle(dataGoogle: any): Promise<void>;
    createTripadvisor(val: any): Promise<void>;
    loadData(file: string): Promise<void>;
}
