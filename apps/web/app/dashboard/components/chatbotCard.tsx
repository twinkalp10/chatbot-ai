import React from "react"
import Link from "next/link"
import Avatar from "boring-avatars"

import { IChatbot } from "@/types/chatbot"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

import { ChatbotOperations } from "./chatbotOperations"

export interface IChatbotCard {
  chatbot: IChatbot
}

const ChatbotCard = ({ chatbot }: IChatbotCard) => {
  return (
    <div className="relative">
      <ChatbotOperations chatbot={chatbot} />
      <Link href={`/dashboard/${chatbot.id}`}>
        <Card className="hover:border-white cursor-pointer">
          <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-4">
            <div className="flex items-center gap-2">
              <Avatar
                size={40}
                name="Maria Mitchell"
                variant="marble"
                colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
              />
              <div>
                <CardTitle className="text-base font-medium">
                  {chatbot.name}
                </CardTitle>
                <p className="text-sm font-normal text-slate-400">
                  {chatbot.url}
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>
      </Link>
    </div>
  )
}

export default ChatbotCard
