/*
  Warnings:

  - Made the column `createdBy` on table `course` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_createdBy_fkey";

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "createdBy" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "course" ADD CONSTRAINT "course_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
