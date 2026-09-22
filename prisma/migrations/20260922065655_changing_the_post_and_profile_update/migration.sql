/*
  Warnings:

  - You are about to drop the column `city` on the `problem_posts` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `problem_posts` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `problem_posts` table. All the data in the column will be lost.
  - Made the column `address` on table `profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `city` on table `profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `state` on table `profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pincode` on table `profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `profiles` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "problem_posts" DROP COLUMN "city",
DROP COLUMN "latitude",
DROP COLUMN "longitude";

-- AlterTable
ALTER TABLE "profiles" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "state" SET NOT NULL,
ALTER COLUMN "pincode" SET NOT NULL,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;
