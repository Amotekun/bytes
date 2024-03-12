/*
  Warnings:

  - You are about to drop the column `followingId` on the `Follow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[followerId,followedId]` on the table `Follow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followedId` to the `Follow` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Follow_followerId_followingId_key` ON `Follow`;

-- DropIndex
DROP INDEX `Follow_followingId_idx` ON `Follow`;

-- AlterTable
ALTER TABLE `Follow` DROP COLUMN `followingId`,
    ADD COLUMN `followedId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE INDEX `Follow_followedId_idx` ON `Follow`(`followedId`);

-- CreateIndex
CREATE UNIQUE INDEX `Follow_followerId_followedId_key` ON `Follow`(`followerId`, `followedId`);
