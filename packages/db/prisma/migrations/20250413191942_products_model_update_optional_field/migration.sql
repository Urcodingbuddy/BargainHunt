-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "amazonReview" DROP NOT NULL,
ALTER COLUMN "flipkartReview" DROP NOT NULL,
ALTER COLUMN "flipkartRating" DROP NOT NULL,
ALTER COLUMN "amazonRating" DROP NOT NULL,
ALTER COLUMN "amazonOriginalPrice" DROP NOT NULL,
ALTER COLUMN "flipkartOriginalPrice" DROP NOT NULL,
ALTER COLUMN "availability" DROP NOT NULL,
ALTER COLUMN "boughtInLastMonth" DROP NOT NULL;
