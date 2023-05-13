import React from "react"
import Avatar from "boring-avatars"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const ChatbotCard = () => {
  return (
    <div>
      <Card>
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
                Website Name
              </CardTitle>
              <p className="text-sm font-normal text-slate-400">
                websiteName.vercel.app
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-7">
          <div className="text-xs text-muted-foreground">
            <div className=" grid gap-4 grid-cols-4">
              <p>Code</p>
              <p>AI</p>
              <p>ChatGPT</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatbotCard
