-- CreateEnum
CREATE TYPE "CourseStatus" AS ENUM ('berjalan', 'selesai');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "status" "CourseStatus" NOT NULL DEFAULT 'berjalan';
