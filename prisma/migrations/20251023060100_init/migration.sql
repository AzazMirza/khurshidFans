/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "product_sku_key" ON "product"("sku");
