import React from "react"
import Avatar from "boring-avatars"
import { DropletIcon } from "lucide-react"

import { IChatbot } from "@/types/chatbot"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"

interface IChatbotCard {
  chatbot: IChatbot
}

const ChatbotCard = ({ chatbot }: IChatbotCard) => {
  return (
    <div>
      <Link href={`/dashboard/${chatbot.id}`}>
         <Card className="hover:border-white cursor-pointer">
        <CardHeader className="flex flex-col items-start justify-between space-y-0 pb-2">
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
        <CardContent className="mt-7">
          <div className="text-muted-foreground text-xs">
            <div className=" grid grid-cols-4 gap-4">
              <p>Code</p>
              <p>AI</p>
              <p>ChatGPT</p>
            </div>
          </div>
        </CardContent>
      </Card>
      </Link>

    </div>
  )
}

export default ChatbotCard
