/*
  Warnings:

  - You are about to drop the `Website` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CHAT_BUBBLE_ALIGNMENT" AS ENUM ('LEFT', 'RIGHT');

-- DropForeignKey
ALTER TABLE "Website" DROP CONSTRAINT "Website_userId_fkey";

-- DropTable
DROP TABLE "Website";

-- CreateTable
CREATE TABLE "ChatBot" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ChatBot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatBotSettings" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatBotId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "welcomeMessage" TEXT NOT NULL,
    "suggestionMessage" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "displayPicture" TEXT NOT NULL,
    "userColorMessage" TEXT NOT NULL,
    "chatBotColorMessage" TEXT NOT NULL,
    "chatBackgroundColor" TEXT NOT NULL,
    "chatBubbleColor" TEXT NOT NULL,
    "chatBubbleAlignment" "CHAT_BUBBLE_ALIGNMENT" NOT NULL DEFAULT 'RIGHT',

    CONSTRAINT "ChatBotSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatBot_id_key" ON "ChatBot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBot_id_userId_key" ON "ChatBot"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBotSettings_id_key" ON "ChatBotSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBotSettings_chatBotId_userId_key" ON "ChatBotSettings"("chatBotId", "userId");

-- AddForeignKey
ALTER TABLE "ChatBot" ADD CONSTRAINT "ChatBot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBotSettings" ADD CONSTRAINT "ChatBotSettings_chatBotId_fkey" FOREIGN KEY ("chatBotId") REFERENCES "ChatBot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBotSettings" ADD CONSTRAINT "ChatBotSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
