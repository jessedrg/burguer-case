-- CreateTable
CREATE TABLE "StoreChanel" (
    "id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "platformType" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "priceLevel" TEXT NOT NULL,
    "ticketPrice" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "platformStoreId" TEXT NOT NULL,
    "platformStoreName" TEXT NOT NULL,
    "platformStoreDescription" TEXT NOT NULL,
    "platformStoreAdress" TEXT NOT NULL,
    "platformStoreUrl" TEXT NOT NULL,
    "note" TEXT NOT NULL,
    "requestToGoogleMaps" BOOLEAN NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "StoreChanel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "Ing" DOUBLE PRECISION NOT NULL,
    "storeChanelId" INTEGER NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "platformReviewId" TEXT NOT NULL,
    "ratingValue" DOUBLE PRECISION NOT NULL,
    "review" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "reviewerAvatar" TEXT NOT NULL,
    "reviewerFirstName" TEXT NOT NULL,
    "reviewerLastName" TEXT NOT NULL,
    "reviewerCount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "platformProductId" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discountedPrice" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Location_storeChanelId_key" ON "Location"("storeChanelId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_storeChanelId_fkey" FOREIGN KEY ("storeChanelId") REFERENCES "StoreChanel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "StoreChanel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "StoreChanel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
