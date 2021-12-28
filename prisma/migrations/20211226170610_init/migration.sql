/*
  Warnings:

  - The primary key for the `StoreChanel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `StoreChanel` table. All the data in the column will be lost.
  - You are about to drop the column `placeId` on the `StoreChanel` table. All the data in the column will be lost.
  - You are about to drop the column `platformType` on the `StoreChanel` table. All the data in the column will be lost.
  - You are about to drop the column `ticketPrice` on the `StoreChanel` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `StoreChanel` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_storeChanelId_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_productId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "storeChanelPlatformStoreId" TEXT;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "storeChanelPlatformStoreId" TEXT;

-- AlterTable
ALTER TABLE "StoreChanel" DROP CONSTRAINT "StoreChanel_pkey",
DROP COLUMN "id",
DROP COLUMN "placeId",
DROP COLUMN "platformType",
DROP COLUMN "ticketPrice",
DROP COLUMN "updatedAt",
ADD CONSTRAINT "StoreChanel_pkey" PRIMARY KEY ("platformStoreId");

-- DropTable
DROP TABLE "Location";

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_storeChanelPlatformStoreId_fkey" FOREIGN KEY ("storeChanelPlatformStoreId") REFERENCES "StoreChanel"("platformStoreId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_storeChanelPlatformStoreId_fkey" FOREIGN KEY ("storeChanelPlatformStoreId") REFERENCES "StoreChanel"("platformStoreId") ON DELETE SET NULL ON UPDATE CASCADE;
