-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "vector";

-- CreateEnum
CREATE TYPE "CHAT_BUBBLE_ALIGNMENT" AS ENUM ('LEFT', 'RIGHT');

-- CreateEnum
CREATE TYPE "MESSAGE_ROLE" AS ENUM ('USER', 'CHATBOT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "isSubscriptionStarted" BOOLEAN NOT NULL DEFAULT false,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

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
CREATE TABLE "ChatBotTextData" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chatBotId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "embading" vector(1536),

    CONSTRAINT "ChatBotTextData_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "Conversation" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "chatBotId" TEXT NOT NULL,

    CONSTRAINT "Conversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversationId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBot_id_key" ON "ChatBot"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBot_id_userId_key" ON "ChatBot"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBotTextData_id_key" ON "ChatBotTextData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBotTextData_id_chatBotId_key" ON "ChatBotTextData"("id", "chatBotId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBotTextData_id_userId_key" ON "ChatBotTextData"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBotSettings_id_key" ON "ChatBotSettings"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatBotSettings_chatBotId_userId_key" ON "ChatBotSettings"("chatBotId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_id_key" ON "Conversation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_id_userId_key" ON "Conversation"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Conversation_id_chatBotId_key" ON "Conversation"("id", "chatBotId");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_conversationId_key" ON "Message"("id", "conversationId");

-- AddForeignKey
ALTER TABLE "ChatBot" ADD CONSTRAINT "ChatBot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBotTextData" ADD CONSTRAINT "ChatBotTextData_chatBotId_fkey" FOREIGN KEY ("chatBotId") REFERENCES "ChatBot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBotTextData" ADD CONSTRAINT "ChatBotTextData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBotSettings" ADD CONSTRAINT "ChatBotSettings_chatBotId_fkey" FOREIGN KEY ("chatBotId") REFERENCES "ChatBot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatBotSettings" ADD CONSTRAINT "ChatBotSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
