/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `ChatBotTextData` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ChatBotTextData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChatBotTextData" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChatBotTextData_id_userId_key" ON "ChatBotTextData"("id", "userId");

-- AddForeignKey
ALTER TABLE "ChatBotTextData" ADD CONSTRAINT "ChatBotTextData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
