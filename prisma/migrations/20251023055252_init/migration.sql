/*
  Warnings:

  - You are about to drop the column `description` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `category` to the `product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sku` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" DROP COLUMN "description",
DROP COLUMN "updatedAt",
ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "sku" TEXT NOT NULL,
ALTER COLUMN "stock" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "product_name_key" ON "product"("name");
