/*
  Warnings:

  - You are about to drop the column `comments` on the `SkillExchange` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SkillExchange" DROP COLUMN "comments",
ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "skillExchangeId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_skillExchangeId_fkey" FOREIGN KEY ("skillExchangeId") REFERENCES "SkillExchange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
