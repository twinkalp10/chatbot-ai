import React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

type ChatbotInputProps = {
  onSubmit: () => void
}

const ChatbotInput = ({ onSubmit }: ChatbotInputProps) => {
  return (
    <div className="max-w-2xl">
      <div className="flex flex-col items-start gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Add Text</h2>
          <p className="text-sm text-muted-foreground">
            Add Name and Description about chatbot.
          </p>
        </div>
        <Input type="text" placeholder="chatbot name" />
        <div className="grid w-full gap-2">
          <Textarea placeholder="data" className="h-80" />
          <Button type="submit" onClick={onSubmit}>
            Initiate Chatbot
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ChatbotInput
