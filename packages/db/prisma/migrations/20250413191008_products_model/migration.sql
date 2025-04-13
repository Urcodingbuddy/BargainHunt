-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "normalizedTitle" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "amazonPrice" TEXT NOT NULL,
    "flipkartPrice" TEXT NOT NULL,
    "amazonReview" TEXT NOT NULL,
    "flipkartReview" TEXT NOT NULL,
    "amazonLink" TEXT NOT NULL,
    "flipkartLink" TEXT NOT NULL,
    "flipkartRating" TEXT NOT NULL,
    "amazonRating" TEXT NOT NULL,
    "amazonOriginalPrice" TEXT NOT NULL,
    "flipkartOriginalPrice" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "boughtInLastMonth" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "matchScore" TEXT NOT NULL,
    "LastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
