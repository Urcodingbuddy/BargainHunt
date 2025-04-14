/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "uniqueId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Product_uniqueId_key" ON "Product"("uniqueId");
