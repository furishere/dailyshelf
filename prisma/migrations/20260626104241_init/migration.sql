-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MOVIE', 'TV_SHOW', 'BOOK');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('WATCHLIST', 'IN_PROGRESS', 'COMPLETED', 'DROPPED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT,
    "bio" TEXT,
    "profilePicture" TEXT,
    "profileBanner" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "poster" TEXT,
    "description" TEXT,
    "releasedYear" INTEGER,
    "status" "Status" NOT NULL,
    "rating" INTEGER NOT NULL,
    "favourite" BOOLEAN NOT NULL DEFAULT false,
    "review" TEXT,
    "notes" TEXT,
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" TEXT NOT NULL,
    "heading" TEXT,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Journal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Collection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionItem" (
    "id" TEXT NOT NULL,
    "collectionId" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,

    CONSTRAINT "CollectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE INDEX "Media_userId_idx" ON "Media"("userId");

-- CreateIndex
CREATE INDEX "Media_status_idx" ON "Media"("status");

-- CreateIndex
CREATE INDEX "Media_type_idx" ON "Media"("type");

-- CreateIndex
CREATE INDEX "Media_userId_status_idx" ON "Media"("userId", "status");

-- CreateIndex
CREATE INDEX "Media_userId_type_idx" ON "Media"("userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Media_userId_key" ON "Media"("userId");

-- CreateIndex
CREATE INDEX "Journal_userId_idx" ON "Journal"("userId");

-- CreateIndex
CREATE INDEX "Collection_userId_idx" ON "Collection"("userId");

-- CreateIndex
CREATE INDEX "CollectionItem_collectionId_idx" ON "CollectionItem"("collectionId");

-- CreateIndex
CREATE INDEX "CollectionItem_mediaId_idx" ON "CollectionItem"("mediaId");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionItem_collectionId_mediaId_key" ON "CollectionItem"("collectionId", "mediaId");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Journal" ADD CONSTRAINT "Journal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Collection" ADD CONSTRAINT "Collection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
