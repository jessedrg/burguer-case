import { S3 } from 'nestjs-s3';
export declare class AppService {
    private readonly s3;
    constructor(s3: S3);
    getHello(): string;
    private getBucket;
    validateGoogle(file: string): Promise<void>;
}
