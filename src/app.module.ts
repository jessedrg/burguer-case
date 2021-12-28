import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { S3Module } from 'nestjs-s3';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    S3Module.forRoot({
      config: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCES_KEY,
        endpoint: 'https://s3.amazonaws.com',
        s3ForcePathStyle: false,
        signatureVersion: 'v4',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
