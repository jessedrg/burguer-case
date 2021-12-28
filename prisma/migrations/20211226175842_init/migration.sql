/*
  Warnings:

  - The primary key for the `StoreChanel` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_storeChanelPlatformStoreId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_storeChanelPlatformStoreId_fkey";

-- AlterTable
ALTER TABLE "Products" ALTER COLUMN "storeChanelPlatformStoreId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "storeChanelPlatformStoreId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "StoreChanel" DROP CONSTRAINT "StoreChanel_pkey",
ALTER COLUMN "platformStoreId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StoreChanel_pkey" PRIMARY KEY ("platformStoreId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_storeChanelPlatformStoreId_fkey" FOREIGN KEY ("storeChanelPlatformStoreId") REFERENCES "StoreChanel"("platformStoreId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_storeChanelPlatformStoreId_fkey" FOREIGN KEY ("storeChanelPlatformStoreId") REFERENCES "StoreChanel"("platformStoreId") ON DELETE SET NULL ON UPDATE CASCADE;
