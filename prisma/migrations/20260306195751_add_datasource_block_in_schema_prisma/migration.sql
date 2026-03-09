/*
  Warnings:

  - You are about to drop the column `banReason` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `banned` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "banReason",
DROP COLUMN "banned",
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Product";
