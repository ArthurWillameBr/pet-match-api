/*
  Warnings:

  - You are about to drop the column `created_at` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "created_at",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";
