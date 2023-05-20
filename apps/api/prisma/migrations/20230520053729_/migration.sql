/*
  Warnings:

  - You are about to drop the column `html` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Website` table. All the data in the column will be lost.
  - You are about to drop the `ChatHistory` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Website` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `image` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Website` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Website` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Website" DROP COLUMN "html",
DROP COLUMN "number",
DROP COLUMN "title",
DROP COLUMN "updatedAt",
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "ChatHistory";

-- CreateIndex
CREATE UNIQUE INDEX "Website_id_key" ON "Website"("id");

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
