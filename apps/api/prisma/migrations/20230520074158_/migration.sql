/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Website` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Website_id_userId_key" ON "Website"("id", "userId");
