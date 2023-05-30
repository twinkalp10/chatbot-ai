"use client"

import React from "react"
import { useParams } from "next/navigation"
import { RefreshCcw, Send } from "lucide-react"
import useSWR from "swr"

import { FormValues } from "@/types/chatbotInterface"
import { fetcher } from "@/lib/axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const Page = () => {
  const params = useParams() as { chatbotId: string }

  const { data, error, isLoading } = useSWR<FormValues[]>(
    `/chatbot-settings/interface/${params.chatbotId}`,
    fetcher
  )

  if (error) {
    return <div>Error fetching data...</div>
  }

  if (isLoading) {
    return <div className="flex flex-col gap-3">loading...</div>
  }

  if (!data) {
    return <div className="flex flex-col gap-3">loading...</div>
  }

  console.log(data[0].userColorMessage)

  return (
    <div
      className={`flex h-screen w-full flex-col justify-between overflow-auto rounded border  border-zinc-200 p-4`}
      style={{ backgroundColor: `${data[0].chatBackgroundColor}` }}
    >
      <div className="flex flex-col space-y-5">
        <div className="self-end">
          <RefreshCcw />
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex justify-start">
            <div className="rounded-lg bg-gray-200  px-4 py-2 text-black">
              <p className="text-sm "> {data[0].welcomeMessage}</p>
            </div>
          </div>

          <div className="flex justify-start">
            <div
              className="rounded-lg px-4 py-2 text-black"
              style={{
                backgroundColor: `${data[0].chatBotColorMessage}`,
              }}
            >
              <p className="text-sm">Sure, I&apos;d be happy to help!</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div
              className="rounded-lg  px-4 py-2 text-white"
              style={{ backgroundColor: `${data[0].userColorMessage}` }}
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
              {data[0].suggestionMessage}
            </button>
          </div>
        </div>
        <div className="flex w-full items-center space-x-2 rounded-md border p-2">
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

export default Page
