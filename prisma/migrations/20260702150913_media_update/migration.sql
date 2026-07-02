/*
  Warnings:

  - You are about to drop the column `releasedYear` on the `Media` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,tmdbId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,googleBookId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,imdbId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Media_userId_key";

-- DropIndex
DROP INDEX "Media_userId_status_idx";

-- DropIndex
DROP INDEX "Media_userId_type_idx";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "releasedYear",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "backdrop" TEXT,
ADD COLUMN     "episodes" INTEGER,
ADD COLUMN     "genres" TEXT[],
ADD COLUMN     "googleBookId" TEXT,
ADD COLUMN     "imdbId" TEXT,
ADD COLUMN     "isbn" TEXT,
ADD COLUMN     "language" TEXT,
ADD COLUMN     "originalTitle" TEXT,
ADD COLUMN     "pages" INTEGER,
ADD COLUMN     "publisher" TEXT,
ADD COLUMN     "releaseDate" TIMESTAMP(3),
ADD COLUMN     "releaseYear" INTEGER,
ADD COLUMN     "runtime" INTEGER,
ADD COLUMN     "seasons" INTEGER,
ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "tmdbId" INTEGER,
ALTER COLUMN "status" SET DEFAULT 'WATCHLIST',
ALTER COLUMN "rating" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "Media_tmdbId_idx" ON "Media"("tmdbId");

-- CreateIndex
CREATE INDEX "Media_imdbId_idx" ON "Media"("imdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_userId_tmdbId_key" ON "Media"("userId", "tmdbId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_userId_googleBookId_key" ON "Media"("userId", "googleBookId");

-- CreateIndex
CREATE UNIQUE INDEX "Media_userId_imdbId_key" ON "Media"("userId", "imdbId");
