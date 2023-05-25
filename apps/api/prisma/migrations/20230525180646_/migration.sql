-- CreateTable
CREATE TABLE "ChatBotTextData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatBotId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "ChatBotTextData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatBotTextData_id_key" ON "ChatBotTextData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBotTextData_id_chatBotId_key" ON "ChatBotTextData"("id", "chatBotId");

-- AddForeignKey
ALTER TABLE "ChatBotTextData" ADD CONSTRAINT "ChatBotTextData_chatBotId_fkey" FOREIGN KEY ("chatBotId") REFERENCES "ChatBot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
