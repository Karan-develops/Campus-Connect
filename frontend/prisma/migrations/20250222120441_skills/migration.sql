-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL DEFAULT 'defaultpassword';

-- CreateTable
CREATE TABLE "SkillExchange" (
    "id" TEXT NOT NULL,
    "offeredSkill" TEXT NOT NULL,
    "desiredSkill" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "comments" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SkillExchange_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SkillExchange" ADD CONSTRAINT "SkillExchange_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
