import React from "react"
import Link from "next/link"

import { IChatbot } from "@/types/chatbot"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface IChatbotCard {
  chatbot: IChatbot
}

const LoadingChatbotsData = () => {
  return (
    <div>
      <Card className="hover:border-white cursor-pointer">
        <div className="flex items-center space-x-4 p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </Card>
    </div>
  )
}

export default LoadingChatbotsData
