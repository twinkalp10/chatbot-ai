import React from "react"
import { RefreshCcw } from "lucide-react"

import { FormValues } from "@/types/chatbotInterface"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type IChatbotUI = {
  watchAllFields: FormValues
}

const ChatbotUI = ({ watchAllFields }: IChatbotUI) => {
  return (
    <div
      className={`flex h-[38rem] w-96 flex-col justify-between overflow-auto rounded border  border-zinc-200 p-2`}
      style={{ backgroundColor: `${watchAllFields.chatBackgroundColor}` }}
    >
      <div className="flex flex-col space-y-5">
        <div className="self-end">
          <RefreshCcw />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-200  px-4 py-2 text-black">
              <p className="text-sm "> {watchAllFields.welcomeMessage}</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div
              className="rounded-lg px-4 py-2 text-black"
              style={{
                backgroundColor: `${watchAllFields.chatBotColorMessage}`,
              }}
            >
              <p className="text-sm">Sure, I&apos;d be happy to help!</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className="rounded-lg  px-4 py-2 text-white"
              style={{ backgroundColor: `${watchAllFields.userColorMessage}` }}
            >
              <p className="text-sm">Thank you for your assistance.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-start p-2">
          <div className=" grid grid-cols-3 gap-2 text-white">
            <button className="text-sm  px-2 py-2  bg-blue-500 rounded-lg">
              {watchAllFields.suggestionMessage}
            </button>
          </div>
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2 rounded-md border p-2">
          <Input
            type="text"
            placeholder="Type your message..."
            className="w-full appearance-none border-none border-transparent focus:outline-none focus:ring-0"
          />
          <Button type="submit">Send</Button>
        </div>
      </div>
    </div>
  )
}

export default ChatbotUI
