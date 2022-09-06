/*
  Warnings:

  - The primary key for the `Course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Course" DROP CONSTRAINT "Course_pkey",
ADD CONSTRAINT "Course_pkey" PRIMARY KEY ("id", "authorId");

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE INDEX "Course_id_idx" ON "Course"("id");
