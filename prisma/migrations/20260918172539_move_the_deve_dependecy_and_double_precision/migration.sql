/*
  Warnings:

  - You are about to alter the column `amount` on the `bookings` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - A unique constraint covering the columns `[serviceRequestId,professionalId]` on the table `bookings` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "bookings" ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- CreateIndex
CREATE UNIQUE INDEX "bookings_serviceRequestId_professionalId_key" ON "bookings"("serviceRequestId", "professionalId");

-- CreateIndex
CREATE INDEX "reviews_id_idx" ON "reviews"("id");
