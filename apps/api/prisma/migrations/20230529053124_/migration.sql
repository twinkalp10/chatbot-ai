/*
  Warnings:

  - A unique constraint covering the columns `[userId,chatBotId,id]` on the table `ChatBotTextData` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ChatBotTextData_id_chatBotId_key";

-- DropIndex
DROP INDEX "ChatBotTextData_id_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "ChatBotTextData_userId_chatBotId_id_key" ON "ChatBotTextData"("userId", "chatBotId", "id");
