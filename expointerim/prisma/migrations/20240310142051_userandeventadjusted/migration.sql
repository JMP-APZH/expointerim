/*
  Warnings:

  - You are about to drop the column `email` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Event` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Event_email_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "email",
DROP COLUMN "time",
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "startTime" TIMESTAMP(3);
