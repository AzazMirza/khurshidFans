/*
  Warnings:

  - Made the column `price` on table `product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sku` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."product_name_key";

-- DropIndex
DROP INDEX "public"."product_sku_key";

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "sku" SET NOT NULL;
