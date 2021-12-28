/*
  Warnings:

  - The `storeChanelPlatformStoreId` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `storeChanelPlatformStoreId` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `StoreChanel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `platformStoreId` on the `StoreChanel` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_storeChanelPlatformStoreId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_storeChanelPlatformStoreId_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "storeChanelPlatformStoreId",
ADD COLUMN     "storeChanelPlatformStoreId" INTEGER;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "storeChanelPlatformStoreId",
ADD COLUMN     "storeChanelPlatformStoreId" INTEGER;

-- AlterTable
ALTER TABLE "StoreChanel" DROP CONSTRAINT "StoreChanel_pkey",
DROP COLUMN "platformStoreId",
ADD COLUMN     "platformStoreId" INTEGER NOT NULL,
ADD CONSTRAINT "StoreChanel_pkey" PRIMARY KEY ("platformStoreId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_storeChanelPlatformStoreId_fkey" FOREIGN KEY ("storeChanelPlatformStoreId") REFERENCES "StoreChanel"("platformStoreId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_storeChanelPlatformStoreId_fkey" FOREIGN KEY ("storeChanelPlatformStoreId") REFERENCES "StoreChanel"("platformStoreId") ON DELETE SET NULL ON UPDATE CASCADE;
